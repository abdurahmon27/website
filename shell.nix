flake:
{
  pkgs,
  ...
}:
let
  # Hostplatform system
  system = pkgs.hostPlatform.system;

  # Production package
  base = flake.packages.${system}.default;

in
pkgs.mkShell {
  inputsFrom = [ base ];

  nativeBuildInputs = with pkgs; [
    nodePackages.typescript
    nodePackages.typescript-language-server

    nixd
    statix
    deadnix
    nixfmt-tree

    tailwindcss
  ];
}
