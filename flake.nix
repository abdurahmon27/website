{
  description = "Website for Floss Uzbekistan community";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    {
      self,
      flake-parts,
      ...
    }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } (
      { ... }:
      {
        systems = [
          "x86_64-linux"
          "aarch64-darwin"
        ];
        flake.nixosModules = {
          server = import ./module.nix self;
        };
        perSystem =
          { pkgs, ... }:
          {
            formatter = pkgs.nixfmt-tree;
            devShells.default = import ./shell.nix self { inherit pkgs; };
            packages.default = pkgs.callPackage ./default.nix { inherit pkgs; };
          };
      }
    );
}
