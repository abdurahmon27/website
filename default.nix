{
  pkgs ?
    let
      lock = (builtins.fromJSON (builtins.readFile ./flake.lock)).nodes.nixpkgs.locked;
      nixpkgs = fetchTarball {
        url = "https://github.com/nixos/nixpkgs/archive/${lock.rev}.tar.gz";
        sha256 = lock.narHash;
      };
    in
    import nixpkgs { overlays = [ ]; },
  ...
}:
let
  manifest = pkgs.lib.importJSON ./package.json;
in
# pkgs.stdenv.mkDerivation {
pkgs.buildNpmPackage {
  pname = manifest.name;
  version = manifest.version;

  src = ./.;
  npmFlags = [ "--legacy-peer-deps" ];
  npmDepsHash = "sha256-MZrBQNB+wazqxhX8Zyn8R0mm1SPGNECax3lGgJrn0/0=";

  installPhase = ''
    # Create output directory
    mkdir -p $out

    # Move compiled contents
    cp -r ./out/* $out
  '';

  nativeBuildInputs = with pkgs; [
    # Typescript
    nodejs
    pnpm
    corepack

    # Hail the Nix
    nixd
    statix
    alejandra
  ];

  buildInputs = with pkgs; [
    openssl
    vips
  ];

  meta = with pkgs.lib; {
    homepage = "https://floss.uz";
    mainProgram = "${manifest.name}-start";
    description = "Website of Floss Uzbekistan community";
    license = with licenses; [ cc-by-40 ];
    platforms = with platforms; linux ++ darwin;
    maintainers = with maintainers; [ orzklv ];
  };
}
