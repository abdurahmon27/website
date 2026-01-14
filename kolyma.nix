# This is deployment module specifically configured
# for Kolyma's Infrastructure and shall not be edited
# by any one other than Kolyma Maintainers themselves!
#
# Maintainers: @orzklv
flake:
{
  config,
  lib,
  pkgs,
  ...
}:
let
  # Shortcut config
  cfg = config.floss.website;

  # Packaged server
  server = flake.packages.${pkgs.stdenv.hostPlatform.system}.default;
in
{
  options = with lib; {
    floss.website = {
      enable = mkEnableOption ''
        Floss Uzbekistan website.
      '';

      proxy = {
        enable = mkEnableOption ''
          Proxy reversed method of deployment
        '';

        domain = mkOption {
          type = with types; nullOr str;
          default = "floss.uz";
          description = "Domain to use while adding configurations to web proxy server";
        };

        alias = mkOption {
          type = with types; listOf str;
          default = [ "www.floss.uz" ];
          description = "Domains that should be aliased to main domain";
        };
      };

      host = mkOption {
        type = types.str;
        default = "127.0.0.1";
        description = "Hostname for nextjs server to bind";
      };

      port = mkOption {
        type = types.int;
        default = 51001;
        description = "Port to use for passing over proxy";
      };

      user = mkOption {
        type = types.str;
        default = "floss-www";
        description = "User for running system + accessing keys";
      };

      group = mkOption {
        type = types.str;
        default = "floss-www";
        description = "Group for running system + accessing keys";
      };

      dataDir = mkOption {
        type = types.str;
        default = "/var/lib/floss/www";
        description = ''
          The path where Floss Website server keeps data and possibly logs.
        '';
      };

      package = mkOption {
        type = types.package;
        default = server;
        description = ''
          Packaged floss.uz website contents for service.
        '';
      };
    };
  };

  config = lib.mkIf cfg.enable {
    warnings = [
      (lib.mkIf (
        cfg.proxy.enable && cfg.proxy.domain == null
      ) "services.floss-website.proxy.domain must be set in order to properly generate certificate!")
    ];

    users.users.${cfg.user} = {
      description = "Floss Website user";
      isSystemUser = true;
      group = cfg.group;
    };

    users.groups.${cfg.group} = { };

    systemd.services.floss-website = {
      description = "Official website of Floss Uzbekistan";
      documentation = [ "https://github.com/floss-uz/website" ];

      environment = {
        PORT = "${toString cfg.port}";
        HOSTNAME = cfg.host;
        NODE_ENV = "production";
      };

      after = [ "network-online.target" ];
      wants = [ "network-online.target" ];
      wantedBy = [ "multi-user.target" ];

      serviceConfig = {
        User = cfg.user;
        Group = cfg.group;
        Restart = "always";
        ExecStart = "${lib.getExe cfg.package}";
        StateDirectory = cfg.user;
        StateDirectoryMode = "0750";
        CapabilityBoundingSet = [
          "AF_NETLINK"
          "AF_INET"
          "AF_INET6"
        ];
        DeviceAllow = [ "/dev/stdin r" ];
        DevicePolicy = "strict";
        IPAddressAllow = "localhost";
        LockPersonality = true;
        NoNewPrivileges = true;
        PrivateDevices = true;
        PrivateTmp = true;
        PrivateUsers = true;
        ProtectClock = true;
        ProtectControlGroups = true;
        ProtectHome = true;
        ProtectHostname = true;
        ProtectKernelLogs = true;
        ProtectKernelModules = true;
        ProtectKernelTunables = true;
        ProtectSystem = "strict";
        ReadOnlyPaths = [ "/" ];
        RemoveIPC = true;
        RestrictAddressFamilies = [
          "AF_NETLINK"
          "AF_INET"
          "AF_INET6"
        ];
        RestrictNamespaces = true;
        RestrictRealtime = true;
        RestrictSUIDSGID = true;
        SystemCallArchitectures = "native";
        SystemCallFilter = [
          "@system-service"
          "~@privileged"
          "~@resources"
          "@pkey"
        ];
        UMask = "0027";
      };
    };

    services.nginx.virtualHosts =
      lib.debug.traceIf (builtins.isNull cfg.proxy.domain)
        "proxy.domain can't be null, please specicy it properly!"
        {
          "${cfg.proxy.domain}" = {
            forceSSL = true;
            enableACME = true;
            locations."/" = {
              proxyPass = "http://127.0.0.1:${toString cfg.port}";
              proxyWebsockets = true;
            };
            serverAliases = cfg.proxy.alias;
          };
        };
  };
}
