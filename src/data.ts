export enum System {
  Amstrad = 'Amstrad',
  Arcade = 'Arcade',
  Arduboy = 'Arduboy',
  Atari2600 = 'Atari 2600',
  Atari5200 = 'Atari 5200',
  Atari7800 = 'Atari 7800',
  AtariJaguar = 'Atari Jaguar',
  AtariLynx = 'Atari Lynx',
  AtariSTSTETTFalcon = 'Atari ST-STE-TT-Falcon',
  BandaiWonderSwanColor = 'Bandai WonderSwan-Color',
  BookReader = 'Book Reader',
  CaveStory = 'Cave Story',
  ChaiLove = 'ChaiLove',
  Chip8 = 'Chip-8',
  ColecoVision = 'ColecoVision',
  CommodoreAmiga = 'Commodore Amiga',
  CommodoreC128 = 'Commodore C128',
  CommodoreC64 = 'Commodore C64',
  CommodoreCBMII = 'Commodore CBM-II',
  CommodorePET = 'Commodore PET',
  CommodoreVIC20 = 'Commodore VIC-20',
  DOS = 'DOS',
  Doom = 'Doom',
  ExternalPorts = 'External - Ports',
  FairchildChannelF = 'Fairchild ChannelF',
  GCEVectrex = 'GCE - Vectrex',
  HandheldElectronicGameAndWatch = 'Handheld Electronic - Game and Watch',
  JavaJ2ME = 'Java J2ME',
  LowResNX = 'LowRes NX',
  LuaEngine = 'Lua Engine',
  MSXSVIColecoVisionSG1000 = 'MSX-SVI-ColecoVision-SG1000',
  MattelIntellivision = 'Mattel - Intellivision',
  MediaPlayer = 'Media Player',
  MegaDuck = 'Mega Duck',
  MicrosoftMSX = 'Microsoft - MSX',
  NECPCEngineCD = 'NEC PC Engine CD',
  NECPCEngineSuperGrafx = 'NEC PC Engine SuperGrafx',
  NECPCEngine = 'NEC PC Engine',
  NECPC8000PC8800Series = 'NEC PC-8000 - PC-8800 series',
  NECPCFX = 'NEC PC-FX',
  NECPC98 = 'NEC PC98',
  NintendoDS = 'Nintendo DS',
  NintendoGameBoyAdvance = 'Nintendo Game Boy Advance',
  NintendoGameBoyColor = 'Nintendo Game Boy Color',
  NintendoGameBoy = 'Nintendo Game Boy',
  NintendoN64 = 'Nintendo N64',
  NintendoNESFamicom = 'Nintendo NES-Famicom',
  NintendoPokemonMini = 'Nintendo Pokemon Mini',
  NintendoSNESSFC = 'Nintendo SNES-SFC',
  NintendoVirtualBoy = 'Nintendo Virtual Boy',
  OpenBOR = 'OpenBOR',
  PICO8 = 'PICO-8',
  PhilipsCDi = 'Philips CDi',
  Quake = 'Quake',
  RPGMaker20002003 = 'RPG Maker 2000 - 2003',
  SNKNeoGeoCD = 'SNK Neo Geo CD',
  SNKNeoGeoPocketColor = 'SNK Neo Geo Pocket - Color',
  SNKNeoGeo = 'SNK Neo Geo',
  ScummVM = 'ScummVM',
  Sega32X = 'Sega 32X',
  SegaAtomiswaveNaomi = 'Sega Atomiswave Naomi',
  SegaDreamcast = 'Sega Dreamcast',
  SegaGameGear = 'Sega Game Gear',
  SegaMasterSystem = 'Sega Master System',
  SegaMegaCDSegaCD = 'Sega Mega CD - Sega CD',
  SegaMegaDriveGenesis = 'Sega Mega Drive - Genesis',
  SegaPico = 'Sega Pico',
  SegaSG1000 = 'Sega SG-1000',
  SegaSaturn = 'Sega Saturn',
  SharpX1 = 'Sharp X1',
  SharpX68000 = 'Sharp X68000',
  SinclairZX81 = 'Sinclair ZX 81',
  SinclairZXSpectrum = 'Sinclair ZX Spectrum',
  SonyPlayStation = 'Sony PlayStation',
  SonyPlaystationPortable = 'Sony Playstation Portable',
  TIC80 = 'TIC-80',
  TexasInstrumentsTI83 = 'Texas Instruments TI-83',
  The3DOCompany3DO = 'The 3DO Company - 3DO',
  Uzebox = 'Uzebox',
  VeMUlator = 'VeMUlator',
  Vircon32 = 'Vircon32',
  WASM4 = 'WASM-4',
  WataraSupervision = 'Watara Supervision',
  Wolfenstein3D = 'Wolfenstein 3D'
}

export const assign = {
  '64': System.NintendoN64,
  '2600': System.Atari2600,
  '5200': System.Atari5200,
  '7800': System.Atari7800,
  '32x': System.Sega32X,
  '64dd': System.NintendoN64,
  'a2600': System.Atari2600,
  'a5200': System.Atari5200,
  'a7800': System.Atari7800,
  'a800': System.AtariSTSTETTFalcon,
  'amiga': System.CommodoreAmiga,
  'amiga500': System.CommodoreAmiga,
  'amstrad': System.Amstrad,
  'amstradcpc': System.Amstrad,
  'amstradgx4000': System.Amstrad,
  'app': System.ExternalPorts,
  'apps': System.ExternalPorts,
  'arcade': System.Arcade,
  'arcadeatomiswave': System.SegaAtomiswaveNaomi,
  'arcadecps1': System.Arcade,
  'arcadecps2': System.Arcade,
  'arcadecps3': System.Arcade,
  'arcadefba': System.Arcade,
  'arcadefbneo': System.Arcade,
  'arcadefinalburnalpha': System.Arcade,
  'arcadefinalburnneo': System.Arcade,
  'arcadehbmame': System.Arcade,
  'arcademame': System.Arcade,
  'arcademame2000': System.Arcade,
  'arcademame2003': System.Arcade,
  'arcademame2003plus': System.Arcade,
  'arcademame2010': System.Arcade,
  'arcademame2016': System.Arcade,
  'arcadenaomi': System.SegaAtomiswaveNaomi,
  'arcadeneogeo': System.SNKNeoGeo,
  'arcadeneogeocd': System.SNKNeoGeoCD,
  'arcadesegaatomiswave': System.SegaAtomiswaveNaomi,
  'arcadeseganaomi': System.SegaAtomiswaveNaomi,
  'arcadesnk': System.SNKNeoGeo,
  'arcadesnkneogeo': System.SNKNeoGeo,
  'arcadevertical': System.Arcade,
  'arcadeverticalarcade': System.Arcade,
  'arcatomiswave': System.SegaAtomiswaveNaomi,
  'arcnaomi': System.SegaAtomiswaveNaomi,
  'arcneogeo': System.SNKNeoGeo,
  'arcneogeocd': System.SNKNeoGeoCD,
  'arcsegaatomiswave': System.SegaAtomiswaveNaomi,
  'arcseganaomi': System.SegaAtomiswaveNaomi,
  'arduboy': System.Arduboy,
  'ast': System.AtariSTSTETTFalcon,
  'atari': System.Atari2600,
  'atari2600': System.Atari2600,
  'atari5200': System.Atari5200,
  'atari7800': System.Atari7800,
  'atarijaguar': System.AtariJaguar,
  'atarilynx': System.AtariLynx,
  'atarist': System.AtariSTSTETTFalcon,
  'atomiswave': System.SegaAtomiswaveNaomi,
  'aw': System.SegaAtomiswaveNaomi,
  'bandaiwonderswan': System.BandaiWonderSwanColor,
  'bandaiwonderswancolor': System.BandaiWonderSwanColor,
  'bgb': System.NintendoGameBoyColor,
  'book': System.BookReader,
  'books': System.BookReader,
  'bsnes': System.NintendoSNESSFC,
  'bws': System.BandaiWonderSwanColor,
  'bwsc': System.BandaiWonderSwanColor,
  'c128': System.CommodoreC128,
  'c64': System.CommodoreC64,
  'capcomplaysystem1': System.Arcade,
  'capcomplaysystem2': System.Arcade,
  'capcomplaysystem3': System.Arcade,
  'cavestory': System.CaveStory,
  'cbmii': System.CommodoreCBMII,
  'cdi': System.PhilipsCDi,
  'chailove': System.ChaiLove,
  'channelf': System.FairchildChannelF,
  'chip8': System.Chip8,
  'chipeight': System.Chip8,
  'coleco': System.ColecoVision,
  'colecovision': System.ColecoVision,
  'commodore': System.CommodoreC64,
  'commodore128': System.CommodoreC128,
  'commodore64': System.CommodoreC64,
  'commodoreamiga': System.CommodoreAmiga,
  'commodorec128': System.CommodoreC128,
  'commodorec64': System.CommodoreC64,
  'commodorecbmii': System.CommodoreCBMII,
  'commodorepet': System.CommodorePET,
  'commodorevic20': System.CommodoreVIC20,
  'cpc': System.Amstrad,
  'cps': System.Arcade,
  'cps1': System.Arcade,
  'cps2': System.Arcade,
  'cps3': System.Arcade,
  'dc': System.SegaDreamcast,
  'dmg': System.NintendoGameBoy,
  'doom': System.Doom,
  'dos': System.DOS,
  'dosbox': System.DOS,
  'drastic': System.NintendoDS,
  'dreamcast': System.SegaDreamcast,
  'ds': System.NintendoDS,
  'dsi': System.NintendoDS,
  'easyrpg': System.RPGMaker20002003,
  'ecwolf': System.Wolfenstein3D,
  'epsxe': System.SonyPlayStation,
  'external': System.ExternalPorts,
  'externalport': System.ExternalPorts,
  'externalports': System.ExternalPorts,
  'fairchild': System.FairchildChannelF,
  'fairchildchannelf': System.FairchildChannelF,
  'famicom': System.NintendoNESFamicom,
  'famicomds': System.NintendoNESFamicom,
  'fba': System.Arcade,
  'fbneo': System.Arcade,
  'fbnneogeo': System.SNKNeoGeo,
  'fc': System.NintendoNESFamicom,
  'fcds': System.NintendoNESFamicom,
  'fcnes': System.NintendoNESFamicom,
  'fds': System.NintendoNESFamicom,
  'fiftytwohundred': System.Atari5200,
  'finalburnalpha': System.Arcade,
  'finalburnneo': System.Arcade,
  'flycast': System.SegaDreamcast,
  'gambatte': System.NintendoGameBoyColor,
  'gameandwatch': System.HandheldElectronicGameAndWatch,
  'gameboy': System.NintendoGameBoy,
  'gameboyadvance': System.NintendoGameBoyAdvance,
  'gamegear': System.SegaGameGear,
  'gamegearhacks': System.SegaGameGear,
  'gamenwatch': System.HandheldElectronicGameAndWatch,
  'gb': System.NintendoGameBoy,
  'gba': System.NintendoGameBoyAdvance,
  'gbadvance': System.NintendoGameBoyAdvance,
  'gbahacks': System.NintendoGameBoyAdvance,
  'gbc': System.NintendoGameBoyColor,
  'gbchacks': System.NintendoGameBoyColor,
  'gbcolor': System.NintendoGameBoyColor,
  'gbdmg': System.NintendoGameBoy,
  'gbhacks': System.NintendoGameBoy,
  'gbsp': System.NintendoGameBoyAdvance,
  'gce': System.GCEVectrex,
  'gcevectrex': System.GCEVectrex,
  'gen': System.SegaMegaDriveGenesis,
  'gen32x': System.Sega32X,
  'gencd': System.SegaMegaCDSegaCD,
  'genesis': System.SegaMegaDriveGenesis,
  'genesiscd': System.SegaMegaCDSegaCD,
  'genesishacks': System.SegaMegaDriveGenesis,
  'genmd': System.SegaMegaDriveGenesis,
  'gens': System.SegaMegaDriveGenesis,
  'gensegacd': System.SegaMegaCDSegaCD,
  'gg': System.SegaGameGear,
  'ggsms': System.SegaMasterSystem,
  'gw': System.HandheldElectronicGameAndWatch,
  'gx4000': System.Amstrad,
  'handheldelectronic': System.HandheldElectronicGameAndWatch,
  'hbmame': System.Arcade,
  'horizontal': System.Arcade,
  'intellivision': System.MattelIntellivision,
  'jaguar': System.AtariJaguar,
  'kega': System.SegaMegaDriveGenesis,
  'lowresnx': System.LowResNX,
  'lua': System.LuaEngine,
  'luaengine': System.LuaEngine,
  'lynx': System.AtariLynx,
  'mame': System.Arcade,
  'mame2000': System.Arcade,
  'mame2003': System.Arcade,
  'mame2003plus': System.Arcade,
  'mame2010': System.Arcade,
  'mame2016': System.Arcade,
  'mastersystem': System.SegaMasterSystem,
  'mastersystemhacks': System.SegaMasterSystem,
  'mattelintellivision': System.MattelIntellivision,
  'md': System.SegaMegaDriveGenesis,
  'md32x': System.Sega32X,
  'mdcd': System.SegaMegaCDSegaCD,
  'mdgen': System.SegaMegaDriveGenesis,
  'mdmsu': System.SegaMegaDriveGenesis,
  'mdmsu1': System.SegaMegaDriveGenesis,
  'mdsegacd': System.SegaMegaCDSegaCD,
  'megacd': System.SegaMegaCDSegaCD,
  'megachip8': System.Chip8,
  'megadrive': System.SegaMegaDriveGenesis,
  'megadrivecd': System.SegaMegaCDSegaCD,
  'megadrivehacks': System.SegaMegaDriveGenesis,
  'mgba': System.NintendoGameBoyAdvance,
  'microsoftdos': System.DOS,
  'microsoftmsx': System.MicrosoftMSX,
  'ms': System.SegaMasterSystem,
  'msdos': System.DOS,
  'msx': System.MicrosoftMSX,
  'msx1': System.MicrosoftMSX,
  'mupen': System.NintendoN64,
  'mupen64': System.NintendoN64,
  'mupen64plus': System.NintendoN64,
  'n64': System.NintendoN64,
  'n64dd': System.NintendoN64,
  'n64hacks': System.NintendoN64,
  'naomi': System.SegaAtomiswaveNaomi,
  'nds': System.NintendoDS,
  'necpc8000': System.NECPC8000PC8800Series,
  'necpc98': System.NECPC98,
  'necpce': System.NECPCEngine,
  'necpcecd': System.NECPCEngineCD,
  'necpcengine': System.NECPCEngine,
  'necpcenginecd': System.NECPCEngineCD,
  'necpcfx': System.NECPCFX,
  'necsgfx': System.NECPCEngineSuperGrafx,
  'necsupergrafx': System.NECPCEngineSuperGrafx,
  'nectg16': System.NECPCEngine,
  'nectgcd': System.NECPCEngineCD,
  'necturbografx': System.NECPCEngine,
  'necturbografx16': System.NECPCEngine,
  'necturbografxcd': System.NECPCEngineCD,
  'neocd': System.SNKNeoGeoCD,
  'neocdz': System.SNKNeoGeoCD,
  'neogeo': System.SNKNeoGeo,
  'neogeocd': System.SNKNeoGeoCD,
  'neogeopocket': System.SNKNeoGeoPocketColor,
  'neogeopocketcolor': System.SNKNeoGeoPocketColor,
  'nes': System.NintendoNESFamicom,
  'nescd': System.NintendoNESFamicom,
  'nesds': System.NintendoNESFamicom,
  'nesfc': System.NintendoNESFamicom,
  'neshacks': System.NintendoNESFamicom,
  'ng': System.SNKNeoGeo,
  'ngb': System.NintendoGameBoy,
  'ngba': System.NintendoGameBoyAdvance,
  'ngbc': System.NintendoGameBoyColor,
  'ngcd': System.SNKNeoGeoCD,
  'ngp': System.SNKNeoGeoPocketColor,
  'ngpc': System.SNKNeoGeoPocketColor,
  'ngpocket': System.SNKNeoGeoPocketColor,
  'ngpocketcolor': System.SNKNeoGeoPocketColor,
  'ngw': System.HandheldElectronicGameAndWatch,
  'nin': System.NintendoNESFamicom,
  'ninds': System.NintendoDS,
  'ningba': System.NintendoGameBoyAdvance,
  'ningbc': System.NintendoGameBoyColor,
  'ninnes': System.NintendoNESFamicom,
  'ninsnes': System.NintendoSNESSFC,
  'nintendo': System.NintendoNESFamicom,
  'nintendo64': System.NintendoN64,
  'nintendods': System.NintendoDS,
  'nintendodsi': System.NintendoDS,
  'nintendoentertainmentsystem': System.NintendoNESFamicom,
  'nintendofamicom': System.NintendoNESFamicom,
  'nintendogameandwatch': System.HandheldElectronicGameAndWatch,
  'nintendogameboy': System.NintendoGameBoy,
  'nintendogameboyadvance': System.NintendoGameBoyAdvance,
  'nintendogameboycolor': System.NintendoGameBoyColor,
  'nintendogb': System.NintendoGameBoy,
  'nintendogba': System.NintendoGameBoyAdvance,
  'nintendogbc': System.NintendoGameBoyColor,
  'nintendogw': System.HandheldElectronicGameAndWatch,
  'nintendon64': System.NintendoN64,
  'nintendones': System.NintendoNESFamicom,
  'nintendones-famicom': System.NintendoNESFamicom,
  'nintendonintendo64': System.NintendoN64,
  'nintendonintendo64dd': System.NintendoN64,
  'nintendonintendodsi': System.NintendoDS,
  'nintendonintendoentertainmentsystem': System.NintendoNESFamicom,
  'nintendopokemini': System.NintendoPokemonMini,
  'nintendopokemonmini': System.NintendoPokemonMini,
  'nintendosfc': System.NintendoSNESSFC,
  'nintendosnes': System.NintendoSNESSFC,
  'nintendosnesmsu': System.NintendoSNESSFC,
  'nintendosnesmsu1': System.NintendoSNESSFC,
  'nintendosnes-sfc': System.NintendoSNESSFC,
  'nintendosupernintendo': System.NintendoSNESSFC,
  'nintendosupernintendoentertainmentsystem': System.NintendoSNESSFC,
  'nintendovb': System.NintendoVirtualBoy,
  'nintendovitrualboy': System.NintendoVirtualBoy,
  'nsnes': System.NintendoSNESSFC,
  'nsv': System.NintendoSNESSFC,
  'nvb': System.NintendoVirtualBoy,
  'openbor': System.OpenBOR,
  'openbeatsofrage': System.OpenBOR,
  'originalgameboy': System.NintendoGameBoy,
  'pbp': System.SonyPlayStation,
  'pbps': System.SonyPlayStation,
  'pc': System.DOS,
  'pc8000': System.NECPC8000PC8800Series,
  'pc98': System.NECPC98,
  'pce': System.NECPCEngine,
  'pcecd': System.NECPCEngineCD,
  'pcengine': System.NECPCEngine,
  'pcenginecd': System.NECPCEngineCD,
  'pcfx': System.NECPCFX,
  'pcsx': System.SonyPlayStation,
  'pet': System.CommodorePET,
  'pgm': System.Arcade,
  'philipscdi': System.PhilipsCDi,
  'pico': System.PICO8,
  'pico8': System.PICO8,
  'playstation': System.SonyPlayStation,
  'playstationchds': System.SonyPlayStation,
  'playstationpbps': System.SonyPlayStation,
  'playstationportable': System.SonyPlaystationPortable,
  'poke': System.NintendoPokemonMini,
  'pokemini': System.NintendoPokemonMini,
  'pokemonmini': System.NintendoPokemonMini,
  'port': System.ExternalPorts,
  'ports': System.ExternalPorts,
  'ppsspp': System.SonyPlaystationPortable,
  'prboom': System.Doom,
  'ps': System.SonyPlayStation,
  'ps1': System.SonyPlayStation,
  'pschd': System.SonyPlayStation,
  'pschds': System.SonyPlayStation,
  'psiso': System.SonyPlayStation,
  'psisos': System.SonyPlayStation,
  'psp': System.SonyPlaystationPortable,
  'pspbp': System.SonyPlayStation,
  'pspbps': System.SonyPlayStation,
  'psx': System.SonyPlayStation,
  'psxchd': System.SonyPlayStation,
  'psxchds': System.SonyPlayStation,
  'psxiso': System.SonyPlayStation,
  'psxisos': System.SonyPlayStation,
  'psxpbp': System.SonyPlayStation,
  'psxpbps': System.SonyPlayStation,
  'quake': System.Quake,
  'redream': System.SegaDreamcast,
  'rpgmaker': System.RPGMaker20002003,
  's32x': System.Sega32X,
  'sameboy': System.NintendoGameBoyColor,
  'sat': System.SegaSaturn,
  'satella': System.NintendoSNESSFC,
  'satellaview': System.NintendoSNESSFC,
  'satourne': System.SegaSaturn,
  'saturn': System.SegaSaturn,
  'scd': System.SegaMegaCDSegaCD,
  'script': System.ExternalPorts,
  'scripts': System.ExternalPorts,
  'scumm': System.ScummVM,
  'scummvm': System.ScummVM,
  'sdc': System.SegaDreamcast,
  'sega32': System.Sega32X,
  'sega32x': System.Sega32X,
  'segaatomiswave': System.SegaAtomiswaveNaomi,
  'segacd': System.SegaMegaCDSegaCD,
  'segadc': System.SegaDreamcast,
  'segadreamcast': System.SegaDreamcast,
  'segagamegear': System.SegaGameGear,
  'segagenesis': System.SegaMegaDriveGenesis,
  'segagenesismsu': System.SegaMegaDriveGenesis,
  'segagg': System.SegaGameGear,
  'segamastersystem': System.SegaMasterSystem,
  'segamcd': System.SegaMegaCDSegaCD,
  'segamdmsu': System.SegaMegaDriveGenesis,
  'segamdmsu1': System.SegaMegaDriveGenesis,
  'segamegacd': System.SegaMegaCDSegaCD,
  'segamegadrive': System.SegaMegaDriveGenesis,
  'segamegadrive-genesis': System.SegaMegaDriveGenesis,
  'segams': System.SegaMasterSystem,
  'seganaomi': System.SegaAtomiswaveNaomi,
  'segasat': System.SegaSaturn,
  'segasaturn': System.SegaSaturn,
  'segascd': System.SegaMegaCDSegaCD,
  'segasegacd': System.SegaMegaCDSegaCD,
  'segasg1000': System.SegaSG1000,
  'segasgone': System.SegaSG1000,
  'segasms': System.SegaMasterSystem,
  'seggg': System.SegaGameGear,
  'segms': System.SegaMasterSystem,
  'seventyeighthundred': System.Atari7800,
  'sfc': System.NintendoSNESSFC,
  'sg1000': System.SegaSG1000,
  'sgfx': System.NECPCEngineSuperGrafx,
  'sgg': System.SegaGameGear,
  'sharpx1': System.SharpX1,
  'sharpx68000': System.SharpX68000,
  'sinclairzx81': System.SinclairZX81,
  'sms': System.SegaMasterSystem,
  'smsgg': System.SegaMasterSystem,
  'snes': System.NintendoSNESSFC,
  'snes9x': System.NintendoSNESSFC,
  'sneshacks': System.NintendoSNESSFC,
  'snesmsu': System.NintendoSNESSFC,
  'snesmsu1': System.NintendoSNESSFC,
  'sng': System.SNKNeoGeo,
  'snkneogeo': System.SNKNeoGeo,
  'snkneogeocd': System.SNKNeoGeoCD,
  'snkneogeopocket': System.SNKNeoGeoPocketColor,
  'snkneogeopocketcolor': System.SNKNeoGeoPocketColor,
  'snkngcd': System.SNKNeoGeoCD,
  'snkngp': System.SNKNeoGeoPocketColor,
  'snkngpc': System.SNKNeoGeoPocketColor,
  'sonyplaystation': System.SonyPlayStation,
  'sonyplaystationportable': System.SonyPlaystationPortable,
  'sonyps': System.SonyPlayStation,
  'sonyps1': System.SonyPlayStation,
  'sonypsp': System.SonyPlaystationPortable,
  'sonypsx': System.SonyPlayStation,
  'ss': System.SegaSaturn,
  'st': System.AtariSTSTETTFalcon,
  'superchip': System.Chip8,
  'superfamicom': System.NintendoSNESSFC,
  'supergrafx': System.NECPCEngineSuperGrafx,
  'supernes': System.NintendoSNESSFC,
  'supernintendo': System.NintendoSNESSFC,
  'supernintendoentertainmentsystem': System.NintendoSNESSFC,
  'superpretendo': System.NintendoSNESSFC,
  'supervision': System.WataraSupervision,
  'swanstation': System.SonyPlayStation,
  'texasinstrumentsti83': System.TexasInstrumentsTI83,
  'tg': System.NECPCEngine,
  'tg16': System.NECPCEngine,
  'tgcd': System.NECPCEngineCD,
  'tgfx': System.NECPCEngine,
  'tgrafx': System.NECPCEngine,
  'tgrafx16': System.NECPCEngine,
  'thirtytwox': System.Sega32X,
  'ti83': System.TexasInstrumentsTI83,
  'tic80': System.TIC80,
  'turbografx': System.NECPCEngine,
  'turbografx16': System.NECPCEngine,
  'turbografxcd': System.NECPCEngineCD,
  'turbographix': System.NECPCEngine,
  'twentysixhundred': System.Atari2600,
  'uzebox': System.Uzebox,
  'varcade': System.Arcade,
  'vb': System.NintendoVirtualBoy,
  'vectrex': System.GCEVectrex,
  'vemulator': System.VeMUlator,
  'vertarcade': System.Arcade,
  'vertical': System.Arcade,
  'verticalarcade': System.Arcade,
  'vic20': System.CommodoreVIC20,
  'virtboy': System.NintendoVirtualBoy,
  'virtuaboy': System.NintendoVirtualBoy,
  'virtualboy': System.NintendoVirtualBoy,
  'wasm4': System.WASM4,
  'watarasupervision': System.WataraSupervision,
  'wolfenstein': System.Wolfenstein3D,
  'wolfenstein3d': System.Wolfenstein3D,
  'wonderswan': System.BandaiWonderSwanColor,
  'wonderswancolor': System.BandaiWonderSwanColor,
  'ws': System.BandaiWonderSwanColor,
  'wsc': System.BandaiWonderSwanColor,
  'x1': System.SharpX1,
  'x68000': System.SharpX68000,
  'yabasanshiro': System.SegaSaturn,
  'yabause': System.SegaSaturn,
  'zsnes': System.NintendoSNESSFC,
  'zx81': System.SinclairZX81,
  'zxs': System.SinclairZXSpectrum
};

export const version = '2410.2_BIG_BANANA';