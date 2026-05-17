'use strict';

const ascii = new TextDecoder('ascii');

const THING_DATA = [
    [null, "Doom monsters"],
    [
        "68",
        "Arachnotron"
    ],
    [
        "64",
        "Arch-vile"
    ],
    [
        "3003",
        "Baron of Hell"
    ],
    [
        "3005",
        "Cacodemon"
    ],
    [
        "72",
        "Commander Keen"
    ],
    [
        "16",
        "Cyberdemon"
    ],
    [
        "3002",
        "Demon"
    ],
    [
        "65",
        "Heavy weapon dude"
    ],
    [
        "69",
        "Hell knight"
    ],
    [
        "3001",
        "Imp"
    ],
    [
        "3006",
        "Lost soul"
    ],
    [
        "67",
        "Mancubus"
    ],
    [
        "71",
        "Pain elemental"
    ],
    [
        "66",
        "Revenant"
    ],
    [
        "9",
        "Shotgun guy"
    ],
    [
        "58",
        "Spectre"
    ],
    [
        "7",
        "Spiderdemon"
    ],
    [
        "84",
        "Wolfenstein SS"
    ],
    [
        "3004",
        "Zombieman"
    ],
    [null, "Doom weapons"],
    [
        "2006",
        "BFG9000"
    ],
    [
        "2002",
        "Chaingun"
    ],
    [
        "2005",
        "Chainsaw"
    ],
    [
        "2004",
        "Plasma gun"
    ],
    [
        "2003",
        "Rocket launcher"
    ],
    [
        "2001",
        "Shotgun"
    ],
    [
        "82",
        "Super shotgun"
    ],
    [null, "Doom ammunition"],
    [
        "2008",
        "4 shotgun shells"
    ],
    [
        "2048",
        "Box of bullets"
    ],
    [
        "2046",
        "Box of rockets"
    ],
    [
        "2049",
        "Box of shotgun shells"
    ],
    [
        "2007",
        "Clip"
    ],
    [
        "2047",
        "Energy cell"
    ],
    [
        "17",
        "Energy cell pack"
    ],
    [
        "2010",
        "Rocket"
    ],
    [null, "Doom artifacts"],
    [
        "2015",
        "Armor bonus"
    ],
    [
        "2023",
        "Berserk"
    ],
    [
        "2026",
        "Computer area map"
    ],
    [
        "2014",
        "Health bonus"
    ],
    [
        "2022",
        "Invulnerability"
    ],
    [
        "2045",
        "Light amplification visor"
    ],
    [
        "83",
        "Megasphere"
    ],
    [
        "2024",
        "Partial invisibility"
    ],
    [
        "2013",
        "Supercharge"
    ],
    [null, "Doom powerups"],
    [
        "2018",
        "Armor"
    ],
    [
        "8",
        "Backpack"
    ],
    [
        "2012",
        "Medikit"
    ],
    [
        "2019",
        "Megaarmor"
    ],
    [
        "2025",
        "Radiation shielding suit"
    ],
    [
        "2011",
        "Stimpack"
    ],
    [
        "5",
        "Blue keycard"
    ],
    [
        "40",
        "Blue skull key"
    ],
    [
        "13",
        "Red keycard"
    ],
    [
        "38",
        "Red skull key"
    ],
    [
        "6",
        "Yellow keycard"
    ],
    [
        "39",
        "Yellow skull key"
    ],
    [null, "Doom obstacles"],
    [
        "47",
        "Brown stump"
    ],
    [
        "70",
        "Burning barrel"
    ],
    [
        "43",
        "Burnt tree"
    ],
    [
        "35",
        "Candelabra"
    ],
    [
        "41",
        "Evil eye"
    ],
    [
        "2035",
        "Exploding barrel"
    ],
    [
        "28",
        "Five skulls \"shish kebab\""
    ],
    [
        "42",
        "Floating skull"
    ],
    [
        "2028",
        "Floor lamp"
    ],
    [
        "53",
        "Hanging leg"
    ],
    [
        "52",
        "Hanging pair of legs"
    ],
    [
        "78",
        "Hanging torso, brain removed"
    ],
    [
        "75",
        "Hanging torso, looking down"
    ],
    [
        "77",
        "Hanging torso, looking up"
    ],
    [
        "76",
        "Hanging torso, open skull"
    ],
    [
        "50",
        "Hanging victim, arms out"
    ],
    [
        "74",
        "Hanging victim, guts and brain removed"
    ],
    [
        "73",
        "Hanging victim, guts removed"
    ],
    [
        "51",
        "Hanging victim, one-legged"
    ],
    [
        "49",
        "Hanging victim, twitching"
    ],
    [
        "25",
        "Impaled human"
    ],
    [
        "54",
        "Large brown tree"
    ],
    [
        "29",
        "Pile of skulls and candles"
    ],
    [
        "55",
        "Short blue firestick"
    ],
    [
        "56",
        "Short green firestick"
    ],
    [
        "31",
        "Short green pillar"
    ],
    [
        "36",
        "Short green pillar with beating heart"
    ],
    [
        "57",
        "Short red firestick"
    ],
    [
        "33",
        "Short red pillar"
    ],
    [
        "37",
        "Short red pillar with skull"
    ],
    [
        "86",
        "Short techno floor lamp"
    ],
    [
        "27",
        "Skull on a pole"
    ],
    [
        "44",
        "Tall blue firestick"
    ],
    [
        "45",
        "Tall green firestick"
    ],
    [
        "30",
        "Tall green pillar"
    ],
    [
        "46",
        "Tall red firestick"
    ],
    [
        "32",
        "Tall red pillar"
    ],
    [
        "48",
        "Tall techno column"
    ],
    [
        "85",
        "Tall techno floor lamp"
    ],
    [
        "26",
        "Twitching impaled human"
    ],
    [null, "Doom decorations"],
    [
        "10",
        "Bloody mess"
    ],
    [
        "12",
        "Bloody mess 2"
    ],
    [
        "34",
        "Candle"
    ],
    [
        "22",
        "Dead cacodemon"
    ],
    [
        "21",
        "Dead demon"
    ],
    [
        "18",
        "Dead former human"
    ],
    [
        "19",
        "Dead former sergeant"
    ],
    [
        "20",
        "Dead imp"
    ],
    [
        "23",
        "Dead lost soul (invisible)"
    ],
    [
        "15",
        "Dead player"
    ],
    [
        "62",
        "Hanging leg"
    ],
    [
        "60",
        "Hanging pair of legs"
    ],
    [
        "59",
        "Hanging victim, arms out"
    ],
    [
        "61",
        "Hanging victim, one-legged"
    ],
    [
        "63",
        "Hanging victim, twitching"
    ],
    [
        "79",
        "Pool of blood"
    ],
    [
        "80",
        "Pool of blood"
    ],
    [
        "24",
        "Pool of blood and flesh"
    ],
    [
        "81",
        "Pool of brains"
    ],
    [null, "Other"],
    [
        "11",
        "Deathmatch start"
    ],
    [
        "89",
        "Monster spawner"
    ],
    [
        "1",
        "Player 1 start"
    ],
    [
        "2",
        "Player 2 start"
    ],
    [
        "3",
        "Player 3 start"
    ],
    [
        "4",
        "Player 4 start"
    ],
    [
        "88",
        "Romero's head"
    ],
    [
        "87",
        "Spawn spot"
    ],
    [
        "14",
        "Teleport landing"
    ],
    [null, "Heretic monsters"],
    [
        "7",
        "D'Sparil"
    ],
    [
        "15",
        "Disciple of D'Sparil"
    ],
    [
        "5",
        "Fire gargoyle"
    ],
    [
        "66",
        "Gargoyle"
    ],
    [
        "68",
        "Golem"
    ],
    [
        "69",
        "Golem ghost"
    ],
    [
        "6",
        "Iron lich"
    ],
    [
        "9",
        "Maulotaur"
    ],
    [
        "45",
        "Nitrogolem"
    ],
    [
        "46",
        "Nitrogolem ghost"
    ],
    [
        "92",
        "Ophidian"
    ],
    [
        "90",
        "Sabreclaw"
    ],
    [
        "64",
        "Undead Warrior"
    ],
    [
        "65",
        "Undead Warrior ghost"
    ],
    [
        "70",
        "Weredragon"
    ],
    [null, "Heretic weapons"],
    [
        "53",
        "Dragon Claw"
    ],
    [
        "2001",
        "Ethereal Crossbow"
    ],
    [
        "2002",
        "Firemace"
    ],
    [
        "2005",
        "Gauntlets of the Necromancer"
    ],
    [
        "2004",
        "Hellstaff"
    ],
    [
        "2003",
        "Phoenix Rod"
    ],
    [null, "Heretic ammunition"],
    [
        "54",
        "Claw Orb"
    ],
    [
        "12",
        "Crystal Geode"
    ],
    [
        "55",
        "Energy Orb"
    ],
    [
        "18",
        "Ethereal Arrows"
    ],
    [
        "22",
        "Flame Orb"
    ],
    [
        "21",
        "Greater Runes"
    ],
    [
        "23",
        "Inferno Orb"
    ],
    [
        "20",
        "Lesser Runes"
    ],
    [
        "13",
        "Mace Spheres"
    ],
    [
        "16",
        "Pile of Mace Spheres"
    ],
    [
        "19",
        "Quiver of Ethereal Arrows"
    ],
    [
        "10",
        "Wand Crystal"
    ],
    [null, "Heretic items"],
    [
        "8",
        "Bag of Holding"
    ],
    [
        "36",
        "Chaos Device"
    ],
    [
        "35",
        "Map Scroll"
    ],
    [
        "30",
        "Morph Ovum"
    ],
    [
        "32",
        "Mystic Urn"
    ],
    [
        "82",
        "Quartz Flask"
    ],
    [
        "84",
        "Ring of Invincibility"
    ],
    [
        "75",
        "Shadowsphere"
    ],
    [
        "34",
        "Timebomb of the Ancients"
    ],
    [
        "86",
        "Tome of Power"
    ],
    [
        "33",
        "Torch"
    ],
    [
        "83",
        "Wings of Wrath"
    ],
    [null, "Heretic health & armor"],
    [
        "81",
        "Crystal Vial"
    ],
    [
        "31",
        "Enchanted Shield"
    ],
    [
        "85",
        "Silver Shield"
    ],
    [null, "Heretic keys"],
    [
        "79",
        "Blue key"
    ],
    [
        "73",
        "Green key"
    ],
    [
        "80",
        "Yellow key"
    ],
    [null, "Heretic obstacles"],
    [
        "44",
        "Barrel"
    ],
    [
        "76",
        "Fire brazier"
    ],
    [
        "51",
        "Hanging corpse"
    ],
    [
        "40",
        "Large stalactite"
    ],
    [
        "38",
        "Large stalagmite"
    ],
    [
        "27",
        "Serpent torch"
    ],
    [
        "29",
        "Short grey pillar"
    ],
    [
        "39",
        "Small stalactite"
    ],
    [
        "37",
        "Small stalagmite"
    ],
    [
        "47",
        "Tall brown pillar"
    ],
    [
        "87",
        "Volcano"
    ],
    [
        "28",
        "Chandelier"
    ],
    [
        "17",
        "Hanging skull (long rope)"
    ],
    [
        "24",
        "Hanging skull (medium rope)"
    ],
    [
        "25",
        "Hanging skull (short rope)"
    ],
    [
        "26",
        "Hanging skull (shortest rope)"
    ],
    [
        "49",
        "Moss 1 string"
    ],
    [
        "48",
        "Moss 2 strings"
    ],
    [
        "50",
        "Wall torch"
    ],
    [null, "Heretic ambient sounds"],
    [
        "1205",
        "Bells"
    ],
    [
        "1202",
        "Drops"
    ],
    [
        "1209",
        "Fast footsteps"
    ],
    [
        "1206",
        "Growl"
    ],
    [
        "1204",
        "Heart beat"
    ],
    [
        "1208",
        "Laughter"
    ],
    [
        "1207",
        "Magic"
    ],
    [
        "1200",
        "Scream"
    ],
    [
        "1203",
        "Slow footsteps"
    ],
    [
        "1201",
        "Squish"
    ],
    [
        "41",
        "Waterfall"
    ],
    [
        "42",
        "Wind"
    ],
    [null, "Heretic other"],
    [
        "56",
        "D'Sparil teleport spot"
    ],
    [
        "11",
        "Deathmatch start"
    ],
    [
        "94",
        "Key gizmo (blue)"
    ],
    [
        "95",
        "Key gizmo (green)"
    ],
    [
        "96",
        "Key gizmo (yellow)"
    ],
    [
        "1",
        "Player 1 start"
    ],
    [
        "2",
        "Player 2 start"
    ],
    [
        "3",
        "Player 3 start"
    ],
    [
        "4",
        "Player 4 start"
    ],
    [
        "2035",
        "Pod"
    ],
    [
        "43",
        "Pod generator"
    ],
    [
        "52",
        "Teleport glitter (blue)"
    ],
    [
        "74",
        "Teleport glitter (red)"
    ],
    [
        "14",
        "Teleport landing"
    ],
    [null, "Hexen monsters"],
    [
        "10060",
        "Afrit"
    ],
    [
        "8080",
        "Brown chaos serpent"
    ],
    [
        "107",
        "Centaur"
    ],
    [
        "114",
        "Dark bishop"
    ],
    [
        "254",
        "Death wyvern"
    ],
    [
        "10030",
        "Ettin"
    ],
    [
        "31",
        "Green chaos serpent"
    ],
    [
        "10080",
        "Heresiarch"
    ],
    [
        "10200",
        "Korax"
    ],
    [
        "10102",
        "Menelkir"
    ],
    [
        "34",
        "Reiver"
    ],
    [
        "10011",
        "Reiver (Buried)"
    ],
    [
        "115",
        "Slaughtaur"
    ],
    [
        "121",
        "Stalker"
    ],
    [
        "120",
        "Stalker boss"
    ],
    [
        "10101",
        "Traductus"
    ],
    [
        "8020",
        "Wendigo"
    ],
    [
        "10100",
        "Zedek"
    ],
    [null, "Hexen weapons"],
    [
        "8040",
        "Arc of Death"
    ],
    [
        "21",
        "Bloodscourge (Skull)"
    ],
    [
        "23",
        "Bloodscourge (Stick)"
    ],
    [
        "22",
        "Bloodscourge (Stub)"
    ],
    [
        "8009",
        "Firestorm"
    ],
    [
        "53",
        "Frost Shards"
    ],
    [
        "123",
        "Hammer of Retribution"
    ],
    [
        "12",
        "Quietus (Blade)"
    ],
    [
        "13",
        "Quietus (Cross)"
    ],
    [
        "16",
        "Quietus (Hilt)"
    ],
    [
        "10",
        "Serpent Staff"
    ],
    [
        "8010",
        "Timon's Axe"
    ],
    [
        "18",
        "Wraithverge (Arc)"
    ],
    [
        "19",
        "Wraithverge (Cross)"
    ],
    [
        "20",
        "Wraithverge (Shaft)"
    ],
    [null, "Hexen ammunition"],
    [
        "122",
        "Blue mana"
    ],
    [
        "8004",
        "Combined mana"
    ],
    [
        "124",
        "Green mana"
    ],
    [null, "Hexen items"],
    [
        "10040",
        "Banishment Device"
    ],
    [
        "8002",
        "Boots of Speed"
    ],
    [
        "36",
        "Chaos Device"
    ],
    [
        "86",
        "Dark Servant"
    ],
    [
        "10110",
        "Disc of Repulsion"
    ],
    [
        "8041",
        "Dragonskin Bracers"
    ],
    [
        "8000",
        "Fléchette"
    ],
    [
        "84",
        "Icon of the Defender"
    ],
    [
        "8003",
        "Krater of Might"
    ],
    [
        "10120",
        "Mystic Ambit Incant"
    ],
    [
        "32",
        "Mystic Urn"
    ],
    [
        "30",
        "Porkalator"
    ],
    [
        "82",
        "Quartz Flask"
    ],
    [
        "33",
        "Torch"
    ],
    [
        "83",
        "Wings of Wrath"
    ],
    [null, "Hexen health & armor"],
    [
        "8008",
        "Amulet of Warding"
    ],
    [
        "81",
        "Crystal Vial"
    ],
    [
        "8006",
        "Falcon Shield"
    ],
    [
        "8005",
        "Mesh Armor"
    ],
    [
        "8007",
        "Platinum Helm"
    ],
    [null, "Hexen keys & puzzle items"],
    [
        "8032",
        "Axe Key"
    ],
    [
        "8200",
        "Castle Key"
    ],
    [
        "8031",
        "Cave Key"
    ],
    [
        "9021",
        "Clock Gear (Bronze in Steel)"
    ],
    [
        "9019",
        "Clock Gear (Bronze)"
    ],
    [
        "9020",
        "Clock Gear (Steel in Bronze)"
    ],
    [
        "9018",
        "Clock Gear (Steel)"
    ],
    [
        "9007",
        "Daemon Codex"
    ],
    [
        "8035",
        "Dungeon Key"
    ],
    [
        "8034",
        "Emerald Key"
    ],
    [
        "9005",
        "Emerald Planet 1"
    ],
    [
        "9009",
        "Emerald Planet 2"
    ],
    [
        "8033",
        "Fire Key"
    ],
    [
        "9014",
        "Flame Mask"
    ],
    [
        "9015",
        "Glaive Seal"
    ],
    [
        "9003",
        "Heart of D'Sparil"
    ],
    [
        "9016",
        "Holy Relic"
    ],
    [
        "8038",
        "Horn Key"
    ],
    [
        "9008",
        "Liber Oscura"
    ],
    [
        "9004",
        "Ruby Planet"
    ],
    [
        "8037",
        "Rusty Key"
    ],
    [
        "9006",
        "Sapphire Planet 1"
    ],
    [
        "9010",
        "Sapphire Planet 2"
    ],
    [
        "9017",
        "Sigil of the Magus"
    ],
    [
        "8036",
        "Silver Key"
    ],
    [
        "8030",
        "Steel Key"
    ],
    [
        "8039",
        "Swamp Key"
    ],
    [
        "9002",
        "Yorick's Skull"
    ],
    [null, "Hexen obstacles"],
    [
        "8100",
        "Barrel"
    ],
    [
        "77",
        "Battle rag banner"
    ],
    [
        "8065",
        "Bell"
    ],
    [
        "99",
        "Black rock"
    ],
    [
        "8061",
        "Brazier with flame"
    ],
    [
        "8051",
        "Bronze gargoyle (short)"
    ],
    [
        "8047",
        "Bronze gargoyle (tall)"
    ],
    [
        "97",
        "Brown rock (large)"
    ],
    [
        "98",
        "Brown rock (small)"
    ],
    [
        "8069",
        "Cauldron (lit)"
    ],
    [
        "8070",
        "Cauldron (unlit)"
    ],
    [
        "8049",
        "Dark lava gargoyle (short)"
    ],
    [
        "8045",
        "Dark lava gargoyle (tall)"
    ],
    [
        "24",
        "Dead tree"
    ],
    [
        "8062",
        "Destructible tree"
    ],
    [
        "8068",
        "Evergreen tree"
    ],
    [
        "80",
        "Gnarled tree 1"
    ],
    [
        "87",
        "Gnarled tree 2"
    ],
    [
        "8103",
        "Hanging bucket"
    ],
    [
        "71",
        "Hanging corpse"
    ],
    [
        "76",
        "Ice gargoyle (short)"
    ],
    [
        "73",
        "Ice gargoyle (tall)"
    ],
    [
        "93",
        "Ice spike (large)"
    ],
    [
        "94",
        "Ice spike (medium)"
    ],
    [
        "95",
        "Ice spike (small)"
    ],
    [
        "96",
        "Ice spike (tiny)"
    ],
    [
        "89",
        "Icicle (large)"
    ],
    [
        "90",
        "Icicle (medium)"
    ],
    [
        "91",
        "Icicle (small)"
    ],
    [
        "92",
        "Icicle (tiny)"
    ],
    [
        "61",
        "Impaled corpse"
    ],
    [
        "8067",
        "Iron maiden"
    ],
    [
        "25",
        "Leafless tree"
    ],
    [
        "8050",
        "Light lava gargoyle (short)"
    ],
    [
        "8046",
        "Light lava gargoyle (tall)"
    ],
    [
        "108",
        "Lynched corpse"
    ],
    [
        "109",
        "Lynched corpse (heartless)"
    ],
    [
        "8042",
        "Minotaur statue (lit)"
    ],
    [
        "8043",
        "Minotaur statue (unlit)"
    ],
    [
        "60",
        "Mossy dead tree"
    ],
    [
        "15",
        "Mossy rock (large)"
    ],
    [
        "26",
        "Mossy tree 1"
    ],
    [
        "27",
        "Mossy tree 2"
    ],
    [
        "9012",
        "Pedestal of D'Sparil"
    ],
    [
        "103",
        "Pillar with vase"
    ],
    [
        "105",
        "Pot (medium)"
    ],
    [
        "106",
        "Pot (short)"
    ],
    [
        "104",
        "Pot (tall)"
    ],
    [
        "8044",
        "Rusty gargoyle (tall)"
    ],
    [
        "8102",
        "Shrub (large)"
    ],
    [
        "8101",
        "Shrub (small)"
    ],
    [
        "110",
        "Sitting corpse"
    ],
    [
        "8060",
        "Skull with flame"
    ],
    [
        "52",
        "Stalactite (large)"
    ],
    [
        "56",
        "Stalactite (medium)"
    ],
    [
        "57",
        "Stalactite (small)"
    ],
    [
        "49",
        "Stalagmite (large)"
    ],
    [
        "50",
        "Stalagmite (medium)"
    ],
    [
        "51",
        "Stalagmite (small)"
    ],
    [
        "48",
        "Stalagmite pillar"
    ],
    [
        "8052",
        "Steel gargoyle (short)"
    ],
    [
        "8048",
        "Steel gargoyle (tall)"
    ],
    [
        "74",
        "Stone gargoyle (short)"
    ],
    [
        "72",
        "Stone gargoyle (tall)"
    ],
    [
        "8064",
        "Suit of armor"
    ],
    [
        "78",
        "Tall tree 1"
    ],
    [
        "79",
        "Tall tree 2"
    ],
    [
        "69",
        "Tombstone (Brian P)"
    ],
    [
        "66",
        "Tombstone (Brian R)"
    ],
    [
        "63",
        "Tombstone (RIP)"
    ],
    [
        "64",
        "Tombstone (Shane)"
    ],
    [
        "67",
        "Tombstone (cross circle)"
    ],
    [
        "65",
        "Tombstone (slimy)"
    ],
    [
        "68",
        "Tombstone (small cross)"
    ],
    [
        "88",
        "Tree log"
    ],
    [
        "29",
        "Tree stump (bare)"
    ],
    [
        "28",
        "Tree stump (burned)"
    ],
    [
        "116",
        "Twined torch (lit)"
    ],
    [
        "117",
        "Twined torch (unlit)"
    ],
    [
        "5",
        "Winged statue"
    ],
    [
        "9011",
        "Yorick's statue"
    ],
    [null, "Hexen decorations"],
    [
        "119",
        "3 Candles (lit)"
    ],
    [
        "8066",
        "Blue candle (lit)"
    ],
    [
        "100",
        "Brick rubble (large)"
    ],
    [
        "102",
        "Brick rubble (medium)"
    ],
    [
        "101",
        "Brick rubble (small)"
    ],
    [
        "8504",
        "Candle w/o web (unlit)"
    ],
    [
        "8502",
        "Candle with web (unlit)"
    ],
    [
        "8072",
        "Chain (long)"
    ],
    [
        "8071",
        "Chain (short)"
    ],
    [
        "8074",
        "Chain with large hook"
    ],
    [
        "8075",
        "Chain with small hook"
    ],
    [
        "8076",
        "Chain with spike ball"
    ],
    [
        "17",
        "Chandelier (lit)"
    ],
    [
        "8063",
        "Chandelier (unlit)"
    ],
    [
        "8507",
        "Goblet (short)"
    ],
    [
        "8508",
        "Goblet (silver)"
    ],
    [
        "8505",
        "Goblet (spilled)"
    ],
    [
        "8506",
        "Goblet (tall)"
    ],
    [
        "8503",
        "Gray candle (unlit)"
    ],
    [
        "58",
        "Hanging moss 1"
    ],
    [
        "59",
        "Hanging moss 2"
    ],
    [
        "8073",
        "Hook with heart"
    ],
    [
        "8077",
        "Hook with skull"
    ],
    [
        "10503",
        "Large flame"
    ],
    [
        "10502",
        "Large flame (timed)"
    ],
    [
        "39",
        "Large mushroom 1"
    ],
    [
        "40",
        "Large mushroom 2"
    ],
    [
        "8509",
        "Meat cleaver"
    ],
    [
        "41",
        "Medium mushroom"
    ],
    [
        "8501",
        "Metal beer stein"
    ],
    [
        "9",
        "Mossy rock (medium)"
    ],
    [
        "7",
        "Mossy rock (small)"
    ],
    [
        "6",
        "Mossy rock (tiny)"
    ],
    [
        "111",
        "Pool of blood"
    ],
    [
        "62",
        "Sleeping corpse"
    ],
    [
        "10501",
        "Small flame"
    ],
    [
        "10500",
        "Small flame (timed)"
    ],
    [
        "42",
        "Small mushroom 1"
    ],
    [
        "44",
        "Small mushroom 2"
    ],
    [
        "45",
        "Small mushroom 3"
    ],
    [
        "46",
        "Small mushroom 4"
    ],
    [
        "47",
        "Small mushroom 5"
    ],
    [
        "37",
        "Tree stump 1"
    ],
    [
        "38",
        "Tree stump 2"
    ],
    [
        "54",
        "Wall torch (lit)"
    ],
    [
        "55",
        "Wall torch (unlit)"
    ],
    [
        "8500",
        "Wooden beer stein"
    ],
    [null, "Hexen ambient sounds"],
    [
        "1403",
        "Creak"
    ],
    [
        "1408",
        "Earth"
    ],
    [
        "1401",
        "Heavy"
    ],
    [
        "1407",
        "Ice"
    ],
    [
        "1405",
        "Lava"
    ],
    [
        "1402",
        "Metal"
    ],
    [
        "1409",
        "Metal2"
    ],
    [
        "1404",
        "Silence"
    ],
    [
        "1400",
        "Stone"
    ],
    [
        "1406",
        "Water"
    ],
    [
        "1410",
        "Wind"
    ],
    [null, "Hexen other"],
    [
        "10225",
        "Bat spawner"
    ],
    [
        "11",
        "Deathmatch start"
    ],
    [
        "10003",
        "Fog patch (large)"
    ],
    [
        "10002",
        "Fog patch (medium)"
    ],
    [
        "10001",
        "Fog patch (small)"
    ],
    [
        "10000",
        "Fog spawner"
    ],
    [
        "118",
        "Glitter bridge"
    ],
    [
        "113",
        "Leaf spawner"
    ],
    [
        "9001",
        "Map spot"
    ],
    [
        "9013",
        "Map spot (gravity)"
    ],
    [
        "1",
        "Player 1 start"
    ],
    [
        "2",
        "Player 2 start"
    ],
    [
        "3",
        "Player 3 start"
    ],
    [
        "4",
        "Player 4 start"
    ],
    [
        "9100",
        "Player 5 start"
    ],
    [
        "9101",
        "Player 6 start"
    ],
    [
        "9102",
        "Player 7 start"
    ],
    [
        "9103",
        "Player 8 start"
    ],
    [
        "8104",
        "Poisonous mushroom"
    ],
    [
        "3000",
        "Polyobject anchor"
    ],
    [
        "3001",
        "Polyobject start spot"
    ],
    [
        "3002",
        "Polyobject start spot (crush)"
    ],
    [
        "10090",
        "Spike Down"
    ],
    [
        "10091",
        "Spike Up"
    ],
    [
        "14",
        "Teleport landing"
    ],
    [
        "140",
        "Teleport smoke"
    ],
    [null, "Strife monsters"],
    [
        "231",
        "Acolyte (blue)"
    ],
    [
        "147",
        "Acolyte (dark green)"
    ],
    [
        "148",
        "Acolyte (gold)"
    ],
    [
        "146",
        "Acolyte (gray)"
    ],
    [
        "232",
        "Acolyte (light green)"
    ],
    [
        "142",
        "Acolyte (red)"
    ],
    [
        "143",
        "Acolyte (rust)"
    ],
    [
        "3002",
        "Acolyte (tan)"
    ],
    [
        "201",
        "Becoming Acolyte"
    ],
    [
        "187",
        "Bishop"
    ],
    [
        "27",
        "Ceiling turret"
    ],
    [
        "3005",
        "Crusader"
    ],
    [
        "128",
        "Entity"
    ],
    [
        "26",
        "Entity nest"
    ],
    [
        "198",
        "Entity pod"
    ],
    [
        "16",
        "Inquisitor"
    ],
    [
        "12",
        "Loremaster"
    ],
    [
        "64",
        "Macil"
    ],
    [
        "200",
        "Macil Spectre"
    ],
    [
        "199",
        "Oracle"
    ],
    [
        "71",
        "Programmer"
    ],
    [
        "3001",
        "Reaver"
    ],
    [
        "3006",
        "Sentinel"
    ],
    [
        "58",
        "Shadow Acolyte"
    ],
    [
        "75",
        "Spectre (Bishop)"
    ],
    [
        "168",
        "Spectre (Loremaster)"
    ],
    [
        "167",
        "Spectre (Macil)"
    ],
    [
        "76",
        "Spectre (Oracle)"
    ],
    [
        "129",
        "Spectre (Programmer)"
    ],
    [
        "186",
        "Stalker"
    ],
    [
        "3003",
        "Templar"
    ],
    [null, "Strife other characters"],
    [
        "73",
        "Armorer"
    ],
    [
        "72",
        "Barkeep"
    ],
    [
        "141",
        "Beggar 1"
    ],
    [
        "155",
        "Beggar 2"
    ],
    [
        "156",
        "Beggar 3"
    ],
    [
        "157",
        "Beggar 4"
    ],
    [
        "158",
        "Beggar 5"
    ],
    [
        "204",
        "Kneeling Guy"
    ],
    [
        "74",
        "Medic"
    ],
    [
        "181",
        "Peasant Blue"
    ],
    [
        "172",
        "Peasant Dark Green 1"
    ],
    [
        "173",
        "Peasant Dark Green 2"
    ],
    [
        "174",
        "Peasant Dark Green 3"
    ],
    [
        "178",
        "Peasant Gold 1"
    ],
    [
        "179",
        "Peasant Gold 2"
    ],
    [
        "180",
        "Peasant Gold 3"
    ],
    [
        "66",
        "Peasant Gray 1"
    ],
    [
        "134",
        "Peasant Gray 2"
    ],
    [
        "135",
        "Peasant Gray 3"
    ],
    [
        "175",
        "Peasant Light Green 1"
    ],
    [
        "176",
        "Peasant Light Green 2"
    ],
    [
        "177",
        "Peasant Light Green 3"
    ],
    [
        "65",
        "Peasant Red 1"
    ],
    [
        "132",
        "Peasant Red 2"
    ],
    [
        "133",
        "Peasant Red 3"
    ],
    [
        "67",
        "Peasant Rust 1"
    ],
    [
        "136",
        "Peasant Rust 2"
    ],
    [
        "137",
        "Peasant Rust 3"
    ],
    [
        "3004",
        "Peasant Tan 1"
    ],
    [
        "130",
        "Peasant Tan 2"
    ],
    [
        "131",
        "Peasant Tan 3"
    ],
    [
        "9",
        "Rebel 1"
    ],
    [
        "144",
        "Rebel 2"
    ],
    [
        "145",
        "Rebel 3"
    ],
    [
        "149",
        "Rebel 4"
    ],
    [
        "150",
        "Rebel 5"
    ],
    [
        "151",
        "Rebel 6"
    ],
    [
        "116",
        "Weapon smith"
    ],
    [
        "169",
        "Zombie"
    ],
    [
        "170",
        "Zombie spawner"
    ],
    [null, "Strife weapons"],
    [
        "2002",
        "Assault rifle (lying)"
    ],
    [
        "2006",
        "Assault rifle (standing)"
    ],
    [
        "2001",
        "Crossbow"
    ],
    [
        "2005",
        "Flamethrower"
    ],
    [
        "154",
        "Grenade launcher"
    ],
    [
        "2004",
        "Mauler"
    ],
    [
        "2003",
        "Mini-missile launcher"
    ],
    [
        "77",
        "Sigil 1 (Lightning)"
    ],
    [
        "78",
        "Sigil 2 (Rail)"
    ],
    [
        "79",
        "Sigil 3 (Spread)"
    ],
    [
        "80",
        "Sigil 4 (Column)"
    ],
    [
        "81",
        "Sigil 5 (Blast)"
    ],
    [null, "Strife ammunition"],
    [
        "2048",
        "Box of bullets"
    ],
    [
        "2007",
        "Bullet clip"
    ],
    [
        "2046",
        "Crate of missiles"
    ],
    [
        "114",
        "Electric bolt"
    ],
    [
        "17",
        "Energy pack"
    ],
    [
        "2047",
        "Energy pod"
    ],
    [
        "152",
        "HE grenade"
    ],
    [
        "2010",
        "Mini-missile"
    ],
    [
        "153",
        "Phosphorous grenade"
    ],
    [
        "115",
        "Poison bolt"
    ],
    [null, "Strife items"],
    [
        "138",
        "10 Gold"
    ],
    [
        "139",
        "25 Gold"
    ],
    [
        "140",
        "50 Gold"
    ],
    [
        "183",
        "Ammo satchel"
    ],
    [
        "206",
        "Communicator"
    ],
    [
        "2025",
        "Environmental suit"
    ],
    [
        "93",
        "Gold coin"
    ],
    [
        "2026",
        "Map"
    ],
    [
        "2027",
        "Scanner"
    ],
    [
        "2024",
        "Shadow armor"
    ],
    [
        "207",
        "Targeter"
    ],
    [
        "10",
        "Teleporter beacon"
    ],
    [null, "Strife health & armor"],
    [
        "2018",
        "Leather armor"
    ],
    [
        "2011",
        "Med patch"
    ],
    [
        "2012",
        "Medical kit"
    ],
    [
        "2019",
        "Metal armor"
    ],
    [
        "83",
        "Surgery kit"
    ],
    [null, "Strife keys & quest items"],
    [
        "230",
        "Base Key"
    ],
    [
        "193",
        "Blue Crystal Key"
    ],
    [
        "39",
        "Brass Key"
    ],
    [
        "226",
        "Broken power coupling"
    ],
    [
        "195",
        "Chapel Key"
    ],
    [
        "182",
        "Computer"
    ],
    [
        "236",
        "Core Key"
    ],
    [
        "59",
        "Degnin ore"
    ],
    [
        "234",
        "Factory Key"
    ],
    [
        "25",
        "Force field guard"
    ],
    [
        "45",
        "Gate piston"
    ],
    [
        "40",
        "Gold Key"
    ],
    [
        "90",
        "Guard uniform"
    ],
    [
        "184",
        "ID Badge"
    ],
    [
        "13",
        "ID Card"
    ],
    [
        "233",
        "Mauler Key"
    ],
    [
        "235",
        "Mine Key"
    ],
    [
        "205",
        "Offering chalice"
    ],
    [
        "52",
        "Officer uniform"
    ],
    [
        "61",
        "Oracle Key"
    ],
    [
        "86",
        "Order Key"
    ],
    [
        "185",
        "Pass Card"
    ],
    [
        "220",
        "Power coupling"
    ],
    [
        "92",
        "Power crystal"
    ],
    [
        "192",
        "Red Crystal Key"
    ],
    [
        "91",
        "Severed Hand"
    ],
    [
        "38",
        "Silver Key"
    ],
    [
        "166",
        "Warehouse Key"
    ],
    [null, "Strife obstacles"],
    [
        "224",
        "Alien asp climber"
    ],
    [
        "221",
        "Alien bubble column"
    ],
    [
        "223",
        "Alien ceiling bubble"
    ],
    [
        "222",
        "Alien floor bubble"
    ],
    [
        "225",
        "Alien spider light"
    ],
    [
        "228",
        "Ammo filler"
    ],
    [
        "194",
        "Anvil"
    ],
    [
        "54",
        "Aztec pillar"
    ],
    [
        "69",
        "Barricade column"
    ],
    [
        "202",
        "Big tree"
    ],
    [
        "197",
        "Brass tech lamp"
    ],
    [
        "70",
        "Burning barrel"
    ],
    [
        "105",
        "Burning bowl"
    ],
    [
        "106",
        "Burning brazier"
    ],
    [
        "35",
        "Candelabra"
    ],
    [
        "162",
        "Cave pillar bottom"
    ],
    [
        "159",
        "Cave pillar top"
    ],
    [
        "63",
        "Chimneystack"
    ],
    [
        "55",
        "Damaged aztec pillar"
    ],
    [
        "94",
        "Exploding barrel"
    ],
    [
        "2028",
        "Globe light"
    ],
    [
        "113",
        "Hearts in tank"
    ],
    [
        "227",
        "Huge alien pillar"
    ],
    [
        "209",
        "Huge tank 1 with skeleton"
    ],
    [
        "210",
        "Huge tank 2"
    ],
    [
        "211",
        "Huge tank 3"
    ],
    [
        "57",
        "Huge tech pillar"
    ],
    [
        "50",
        "Huge torch"
    ],
    [
        "47",
        "Large torch"
    ],
    [
        "111",
        "Medium torch"
    ],
    [
        "43",
        "Outside lamp"
    ],
    [
        "51",
        "Palm tree"
    ],
    [
        "188",
        "Pitcher"
    ],
    [
        "46",
        "Pole lantern"
    ],
    [
        "165",
        "Pot"
    ],
    [
        "203",
        "Potted tree"
    ],
    [
        "56",
        "Ruined aztec pillar"
    ],
    [
        "44",
        "Ruined statue"
    ],
    [
        "60",
        "Short bush"
    ],
    [
        "196",
        "Silver tech lamp"
    ],
    [
        "98",
        "Stalactite (large)"
    ],
    [
        "161",
        "Stalactite (small)"
    ],
    [
        "160",
        "Stalagmite (large)"
    ],
    [
        "163",
        "Stalagmite (small)"
    ],
    [
        "110",
        "Statue"
    ],
    [
        "189",
        "Stool"
    ],
    [
        "117",
        "Surgery crab"
    ],
    [
        "62",
        "Tall bush"
    ],
    [
        "213",
        "Tank 4 spine with organs"
    ],
    [
        "214",
        "Tank 5 stumpy the acolyte"
    ],
    [
        "229",
        "Tank 6 spectre"
    ],
    [
        "48",
        "Tech pillar"
    ],
    [
        "68",
        "Tray"
    ],
    [
        "33",
        "Tree stub"
    ],
    [
        "82",
        "Wooden barrel"
    ],
    [null, "Strife decorations"],
    [
        "96",
        "Brass fluorescent light"
    ],
    [
        "28",
        "Cage light"
    ],
    [
        "34",
        "Candle"
    ],
    [
        "109",
        "Ceiling chain"
    ],
    [
        "53",
        "Ceiling water drip"
    ],
    [
        "21",
        "Dead acolyte (disappears)"
    ],
    [
        "22",
        "Dead crusader"
    ],
    [
        "18",
        "Dead peasant (disappears)"
    ],
    [
        "15",
        "Dead player (disappears)"
    ],
    [
        "20",
        "Dead reaver"
    ],
    [
        "19",
        "Dead rebel"
    ],
    [
        "103",
        "Floor water drip"
    ],
    [
        "97",
        "Gold fluorescent light"
    ],
    [
        "24",
        "Klaxon warning light"
    ],
    [
        "190",
        "Metal pot"
    ],
    [
        "164",
        "Mug"
    ],
    [
        "217",
        "Rebel boots"
    ],
    [
        "218",
        "Rebel helmet"
    ],
    [
        "219",
        "Rebel shirt"
    ],
    [
        "99",
        "Rock 1"
    ],
    [
        "100",
        "Rock 2"
    ],
    [
        "101",
        "Rock 3"
    ],
    [
        "102",
        "Rock 4"
    ],
    [
        "29",
        "Rubble 1"
    ],
    [
        "30",
        "Rubble 2"
    ],
    [
        "31",
        "Rubble 3"
    ],
    [
        "32",
        "Rubble 4"
    ],
    [
        "36",
        "Rubble 5"
    ],
    [
        "37",
        "Rubble 6"
    ],
    [
        "41",
        "Rubble 7"
    ],
    [
        "42",
        "Rubble 8"
    ],
    [
        "212",
        "Sacrificed guy"
    ],
    [
        "216",
        "Sigil banner"
    ],
    [
        "95",
        "Silver fluorescent light"
    ],
    [
        "107",
        "Small torch (lit)"
    ],
    [
        "108",
        "Small torch (unlit)"
    ],
    [
        "215",
        "Stick in water"
    ],
    [
        "191",
        "Tub"
    ],
    [
        "2014",
        "Water bottle"
    ],
    [
        "112",
        "Water fountain"
    ],
    [
        "104",
        "Waterfall splash"
    ],
    [null, "Strife other"],
    [
        "11",
        "Deathmatch start"
    ],
    [
        "1",
        "Player 1 start"
    ],
    [
        "2",
        "Player 2 start"
    ],
    [
        "3",
        "Player 3 start"
    ],
    [
        "4",
        "Player 4 start"
    ],
    [
        "208",
        "Practice target"
    ],
    [
        "85",
        "Rat buddy"
    ],
    [
        "14",
        "Teleport landing"
    ],
    [
        "23",
        "Teleport swirl"
    ],
    [null, "Strife veteran edition"],
    [
        "7970",
        "Blue chalice"
    ],
    [
        "5130",
        "Blue flag spot"
    ],
    [
        "7968",
        "Blue talisman"
    ],
    [
        "7967",
        "Green talisman"
    ],
    [
        "7975",
        "Ore spawner"
    ],
    [
        "5131",
        "Red flag spot"
    ],
    [
        "7966",
        "Red talisman"
    ],
    [
        "5080",
        "Team Blue start"
    ],
    [
        "5081",
        "Team Red start"
    ],
]; 

const THING_SPRITES = {
	doom: {
		1: 'PLAY',
		2: 'PLAY',
		3: 'PLAY',
		4: 'PLAY',
		5: 'BKEY',
		6: 'YKEY',
		7: 'SPID',
		8: 'BPAK',
		9: 'SPOS',
		10: 'PLAY',
		11: 'PLAY',
		12: 'PLAY',
		13: 'RKEY',
		14: 'BON1',
		15: 'PLAY',
		16: 'CYBR',
		17: 'CELP',
		18: 'POSS',
		19: 'SPOS',
		20: 'TROO',
		21: 'SARG',
		22: 'HEAD',
		23: 'SKUL',
		24: 'POL5',
		25: 'POL1',
		26: 'POL6',
		27: 'POL4',
		28: 'POL2',
		29: 'POL3',
		30: 'COL1',
		31: 'COL2',
		32: 'COL3',
		33: 'COL4',
		34: 'CAND',
		35: 'CBRA',
		36: 'COL5',
		37: 'COL6',
		38: 'RSKU',
		39: 'YSKU',
		40: 'BSKU',
		41: 'CEYE',
		42: 'FSKU',
		43: 'TRE1',
		44: 'TBLU',
		45: 'TGRN',
		46: 'TRED',
		47: 'SMIT',
		48: 'ELEC',
		49: 'GOR1',
		50: 'GOR2',
		51: 'GOR3',
		52: 'GOR4',
		53: 'GOR5',
		54: 'TRE2',
		55: 'SMBT',
		56: 'SMGT',
		57: 'SMRT',
		58: 'SARG',
		59: 'GOR2',
		60: 'GOR4',
		61: 'GOR3',
		62: 'GOR5',
		63: 'GOR1',
		64: 'VILE',
		65: 'CPOS',
		66: 'SKEL',
		67: 'FATT',
		68: 'BSPI',
		69: 'BOS2',
		70: 'FCAN',
		71: 'PAIN',
		72: 'KEEN',
		73: 'HDB1',
		74: 'HDB2',
		75: 'HDB3',
		76: 'HDB4',
		77: 'HDB5',
		78: 'HDB6',
		79: 'POB1',
		80: 'POB2',
		81: 'BRS1',
		82: 'SGN2',
		83: 'MEGA',
		84: 'SSWV',
		2001: 'SHOT',
		2002: 'MGUN',
		2003: 'LAUN',
		2004: 'PLAS',
		2005: 'CSAW',
		2006: 'BFUG',
		2007: 'CLIP',
		2008: 'SHEL',
		2010: 'ROCK',
		2011: 'STIM',
		2012: 'MEDI',
		2013: 'SOUL',
		2014: 'BON1',
		2015: 'BON2',
		2018: 'ARM1',
		2019: 'ARM2',
		2022: 'PINV',
		2023: 'PSTR',
		2024: 'PINS',
		2025: 'SUIT',
		2026: 'PMAP',
		2045: 'PVIS',
		2046: 'BROK',
		2047: 'CELL',
		2048: 'AMMO',
		2049: 'SBOX',
		3001: 'TROO',
		3002: 'SARG',
		3003: 'BOSS',
		3004: 'POSS',
		3005: 'HEAD',
		3006: 'SKUL',
		2035: 'BAR1'
	},
	heretic: {
		5: 'IMPX',
		6: 'HEAD',
		7: 'SRCR',
		8: 'BAGH',
		9: 'MNTR',
		10: 'AMG1',
		12: 'AMG2',
		13: 'AMM1',
		14: 'IMPX',
		15: 'WZRD',
		16: 'AMM2',
		17: 'SKH1',
		18: 'AMC1',
		19: 'AMC2',
		20: 'AMS1',
		21: 'AMS2',
		22: 'AMP1',
		23: 'AMP2',
		24: 'SKH2',
		25: 'SKH3',
		26: 'SKH4',
		27: 'SRTC',
		28: 'CHDL',
		29: 'SMPL',
		30: 'EGGC',
		31: 'SHD2',
		32: 'SPHL',
		33: 'TRCH',
		34: 'FBMB',
		35: 'SPMP',
		36: 'ATLP',
		37: 'STGS',
		38: 'STGL',
		39: 'STCS',
		40: 'STCL',
		42: 'AMG1',
		43: 'AMG1',
		44: 'BARL',
		45: 'MUMM',
		46: 'MUMM',
		47: 'BRPL',
		48: 'MOS1',
		49: 'MOS2',
		50: 'WTRH',
		51: 'HCOR',
		52: 'TGLT',
		53: 'WBLS',
		54: 'AMB1',
		55: 'AMB2',
		64: 'KNIG',
		65: 'KNIG',
		66: 'IMPX',
		68: 'MUMM',
		69: 'MUMM',
		70: 'BEAS',
		73: 'AKYY',
		74: 'TGLT',
		75: 'INVS',
		76: 'KFR1',
		79: 'BKYY',
		80: 'CKYY',
		81: 'PTN1',
		82: 'PTN2',
		83: 'SOAR',
		84: 'INVU',
		85: 'SHLD',
		86: 'PWBK',
		87: 'VLCO',
		90: 'CLNK',
		92: 'SNKE',
		94: 'KGZ1',
		95: 'KGZ1',
		96: 'KGZ1',
		2001: 'WBOW',
		2002: 'WMCE',
		2003: 'WPHX',
		2004: 'WSKL',
		2005: 'WGNT',
		2035: 'PPOD'
	},
	hexen: {
		5: 'STTW',
		6: 'RCK1',
		7: 'RCK2',
		9: 'MNTR',
		10: 'WCSS',
		12: 'WFR1',
		13: 'WFR2',
		14: 'MAN1',
		15: 'RCK4',
		16: 'WFR3',
		17: 'CDLR',
		18: 'WCH1',
		19: 'WCH2',
		20: 'WCH3',
		21: 'WMS1',
		22: 'WMS2',
		23: 'WMS3',
		24: 'TRE1',
		25: 'TRE1',
		26: 'TRE2',
		27: 'TRE3',
		28: 'STM1',
		29: 'STM2',
		30: 'PORK',
		31: 'DEMN',
		32: 'SPHL',
		33: 'TRCH',
		34: 'WRTH',
		36: 'ATLP',
		37: 'STM3',
		38: 'STM4',
		39: 'MSH1',
		40: 'MSH2',
		41: 'TLGL',
		42: 'MSH4',
		44: 'MSH5',
		45: 'MSH6',
		46: 'MSH7',
		47: 'MSH8',
		48: 'SGMP',
		49: 'SGM1',
		50: 'SGM2',
		51: 'SGM3',
		52: 'SLC1',
		53: 'WMCS',
		54: 'WLTR',
		55: 'WLTR',
		56: 'SLC2',
		57: 'SLC3',
		58: 'MSS1',
		59: 'MSS2',
		60: 'SWMV',
		61: 'CPS1',
		62: 'CPS2',
		63: 'TMS1',
		64: 'TMS2',
		65: 'TMS3',
		66: 'TMS4',
		67: 'TMS5',
		68: 'TMS6',
		69: 'TMS7',
		71: 'CPS3',
		72: 'STT2',
		73: 'STT3',
		74: 'STT4',
		76: 'STT5',
		77: 'BNR1',
		78: 'TRE4',
		79: 'TRE5',
		80: 'TRE6',
		81: 'PTN1',
		82: 'PTN2',
		83: 'SOAR',
		84: 'INVU',
		86: 'SUMN',
		87: 'TRE7',
		88: 'LOGG',
		89: 'ICT1',
		90: 'ICT2',
		91: 'ICT3',
		92: 'ICT4',
		93: 'ICM1',
		94: 'ICM2',
		95: 'ICM3',
		96: 'ICM4',
		97: 'RKBL',
		98: 'RKBS',
		99: 'RKBK',
		100: 'RBL1',
		101: 'RBL2',
		102: 'RBL3',
		103: 'VASE',
		104: 'POT1',
		105: 'POT2',
		106: 'POT3',
		107: 'CENT',
		108: 'CPS4',
		109: 'CPS5',
		110: 'CPS6',
		111: 'BDPL',
		113: 'MAN1',
		114: 'BISH',
		115: 'CENT',
		116: 'TWTR',
		117: 'TWTR',
		118: 'TLGL',
		119: 'CNDL',
		120: 'SSPT',
		121: 'SSPT',
		122: 'MAN1',
		123: 'WFHM',
		124: 'MAN2',
		140: 'TSMK',
		254: 'DRAG',
		1410: 'TLGL',
		8000: 'PSBG',
		8002: 'SPED',
		8003: 'BMAN',
		8004: 'MAN3',
		8005: 'ARM1',
		8006: 'ARM2',
		8007: 'ARM3',
		8008: 'ARM4',
		8009: 'WCFM',
		8010: 'WFAX',
		8020: 'ICEY',
		8030: 'KEY1',
		8031: 'KEY2',
		8032: 'KEY3',
		8033: 'KEY4',
		8034: 'KEY5',
		8035: 'KEY6',
		8036: 'KEY7',
		8037: 'KEY8',
		8038: 'KEY9',
		8039: 'KEYA',
		8040: 'WMLG',
		8041: 'BRAC',
		8042: 'FBUL',
		8043: 'FBUL',
		8044: 'GAR1',
		8045: 'GAR2',
		8046: 'GAR3',
		8047: 'GAR4',
		8048: 'GAR5',
		8049: 'GAR6',
		8050: 'GAR7',
		8051: 'GAR8',
		8052: 'GAR9',
		8060: 'FSKL',
		8061: 'BRTR',
		8062: 'TRDT',
		8063: 'CDLR',
		8064: 'SUIT',
		8065: 'BBLL',
		8066: 'CAND',
		8067: 'IRON',
		8068: 'XMAS',
		8069: 'CDRN',
		8070: 'CDRN',
		8071: 'CHNS',
		8072: 'CHNS',
		8073: 'CHNS',
		8074: 'CHNS',
		8075: 'CHNS',
		8076: 'CHNS',
		8077: 'CHNS',
		8080: 'DEM2',
		8100: 'BARL',
		8101: 'SHB1',
		8102: 'SHB2',
		8103: 'BCKT',
		8104: 'SHRM',
		8200: 'KEYB',
		8500: 'TST1',
		8501: 'TST2',
		8502: 'TST3',
		8503: 'TST4',
		8504: 'TST5',
		8505: 'TST6',
		8506: 'TST7',
		8507: 'TST8',
		8508: 'TST9',
		8509: 'TST0',
		9001: 'TLGL',
		9002: 'ASKU',
		9003: 'ABGM',
		9004: 'AGMR',
		9005: 'AGMG',
		9006: 'AGMB',
		9007: 'ABK1',
		9008: 'ABK2',
		9009: 'AGG2',
		9010: 'AGB2',
		9011: 'STWN',
		9012: 'GMPD',
		9013: 'TLGL',
		9014: 'ASK2',
		9015: 'AFWP',
		9016: 'ACWP',
		9017: 'AMWP',
		9018: 'AGER',
		9019: 'AGR2',
		9020: 'AGR3',
		9021: 'AGR4',
		10000: 'MAN1',
		10001: 'FOGS',
		10002: 'FOGM',
		10003: 'FOGL',
		10011: 'WRTH',
		10030: 'ETTN',
		10040: 'TELO',
		10060: 'FDMN',
		10080: 'SORC',
		10090: 'TSPK',
		10091: 'TSPK',
		10100: 'PLAY',
		10101: 'CLER',
		10102: 'MAGE',
		10110: 'BLST',
		10120: 'HRAD',
		10200: 'KORX',
		10225: 'MAN1',
		10500: 'FFSM',
		10501: 'FFSM',
		10502: 'FFLG',
		10503: 'FFLG'
	}
};

function buildThingNamesByGame() {
	const names = {
		generic: {},
		doom: {},
		heretic: {},
		hexen: {},
		strife: {}
	};
	let game = null;
	THING_DATA.forEach(([id, name]) => {
		if (!id) {
			const match = /^(Doom|Heretic|Hexen|Strife)\b/.exec(name);
			game = match ? match[1].toLowerCase() : null;
			return;
		}

		const type = parseInt(id);
		if (!names.generic[type]) {
			names.generic[type] = name;
		}
		if (game && !names[game][type]) {
			names[game][type] = name;
		}
	});
	return names;
}

const THING_NAMES_BY_GAME = buildThingNamesByGame();

function asciiz(buf) {
	let name = ascii.decode(new Uint8Array(buf));
	const namezidx = name.indexOf('\0');
	if (namezidx != -1) {
		name = name.substr(0, namezidx);
	}
	return name;
}

function dataView(buf) {
	return new DataView(buf);
}

function u8(view, offset) {
	return view.getUint8(offset);
}

function u16(view, offset) {
	return view.getUint16(offset, true);
}

function i16(view, offset) {
	return view.getInt16(offset, true);
}

function u32(view, offset) {
	return view.getUint32(offset, true);
}

function i32(view, offset) {
	return view.getInt32(offset, true);
}

function sameVertex(a, b) {
	return a && b && a.id == b.id;
}

function orderedSegPath(segs) {
	const remaining = segs.filter((seg) => seg && seg.from && seg.to).slice();
	if (!remaining.length) return [];

	const first = remaining.shift();
	const path = [first.from, first.to];
	while (remaining.length) {
		const last = path[path.length - 1];
		let found = remaining.findIndex((seg) => sameVertex(seg.from, last) || sameVertex(seg.to, last));
		if (found == -1) {
			const start = path[0];
			found = remaining.findIndex((seg) => sameVertex(seg.from, start) || sameVertex(seg.to, start));
			if (found == -1) break;
			path.reverse();
		}

		const seg = remaining.splice(found, 1)[0];
		const lastAfterReverse = path[path.length - 1];
		if (sameVertex(seg.from, lastAfterReverse)) {
			path.push(seg.to);
		} else {
			path.push(seg.from);
		}
	}

	if (path.length > 1 && sameVertex(path[0], path[path.length - 1])) {
		path.pop();
	}
	return path;
}

function orderedEdgePaths(edges) {
	const remaining = edges.filter((edge) => edge && edge.from && edge.to).slice();
	const paths = [];

	while (remaining.length) {
		const first = remaining.shift();
		const path = [first.from, first.to];
		while (remaining.length) {
			const last = path[path.length - 1];
			const firstVertex = path[0];
			if (sameVertex(last, firstVertex)) {
				path.pop();
				break;
			}

			const found = remaining.findIndex((edge) =>
				sameVertex(edge.from, last) || sameVertex(edge.to, last));
			if (found == -1) break;

			const edge = remaining.splice(found, 1)[0];
			if (sameVertex(edge.from, last)) {
				path.push(edge.to);
			} else {
				path.push(edge.from);
			}
		}

		if (path.length > 1 && sameVertex(path[0], path[path.length - 1])) {
			path.pop();
		}
		if (path.length >= 3) {
			paths.push(path);
		}
	}

	return paths;
}

class MapInfo {
	constructor(data) {
		this.maps = {};
		let map = null;
		ascii.decode(data).split(/\r?\n/).forEach((line) => {
			if (/^\s*;/.exec(line)) return;
			line = line.trim();
			if (line.length == 0) return;

			const parse_map = /^map (\d+) ("(?:[^"\\]|\\.)*")$/i.exec(line);
			const kvint = /^(warptrans|next|cluster) (\d+)$/i.exec(line);

			if (parse_map) {
				map = {
					id: parseInt(parse_map[1]),
					name: JSON.parse(parse_map[2])
				}
				this.maps['MAP' + map.id.toString(10).padStart(2, '0')] = map;
			} else if (kvint) {
				map[kvint[1]] = parseInt(kvint[2]);
			}
		});
	}
}

class DoomMap {
	constructor(iwad, name, data) {
		this.iwad = iwad;
		const vertex_view = dataView(data.vertexes);
		let psxfactor = 0;
		for (let i = 0; i + 3 < data.vertexes.byteLength; i += 4) {
			if (i16(vertex_view, i) == 0) psxfactor++;
		}
		const is_psx = data.vertexes.byteLength > 32 && psxfactor / (data.vertexes.byteLength / 2) > 0.45;
		this.vertexes = [];
		for (let i = 0; i + (is_psx ? 7 : 3) < data.vertexes.byteLength; i += is_psx ? 8 : 4) {
			this.vertexes.push({
				id: parseInt(i / (is_psx ? 8 : 4)),
				x: is_psx ? i32(vertex_view, i) / 65536 : i16(vertex_view, i),
				y: -(is_psx ? i32(vertex_view, i + 4) / 65536 : i16(vertex_view, i + 2))
			});
		}
		this.id = name;
		this.name = name;
		const mapinfo = iwad.mapinfo.maps[name];
		if (mapinfo) {
			this.name = this.name;
			if (mapinfo.warptrans) {
				this.name = this.name + ' (hx#' + mapinfo.warptrans + ')';
			}
			if (mapinfo.name) {
				this.name = this.name + ' ' + mapinfo.name;
			}
			if (mapinfo.cluster) {
				this.name = 'Hub ' + mapinfo.cluster + ': ' + this.name;
			}
		}
		this.sidedefs = [];
		this.sectors = [];
		const sector_view = dataView(data.sectors);
		for (let i = 0; i < data.sectors.byteLength - 25; i += 26) {
			const floor = asciiz(data.sectors.slice(i + 4, i + 12));
			const ceil = asciiz(data.sectors.slice(i + 12, i + 20));
			const sector = {
				id: parseInt(i / 26),
				floor: {
					height: i16(sector_view, i),
					texture: floor
				},
				ceiling: {
					height: i16(sector_view, i + 2),
					texture: ceil
				},
				light_level: u16(sector_view, i + 20),
				special_type: u16(sector_view, i + 22),
				tag: u16(sector_view, i + 24),
				sidedefs: [],
				linedefs: []
			};
			this.sectors.push(sector);
		}
		const sidedef_view = dataView(data.sidedefs);
		for (let i = 0; i < data.sidedefs.byteLength - 29; i += 30) {
			const sector_id = u16(sidedef_view, i + 28);
			const sidedef = {
				id: parseInt(i / 30),
				linedefs: []
			};
			this.sidedefs.push(sidedef);
			if (this.sectors[sector_id]) {
				this.sectors[sector_id].sidedefs.push(sidedef);
				sidedef.sector = this.sectors[sector_id];
			}
		}
		const linedef_view = dataView(data.linedefs);
		this.linedefs = [];
		const linedef_width = this.iwad.isHexen ? 16 : 14;
		for (let i = 0; i < data.linedefs.byteLength - linedef_width + 1; i += linedef_width) {
			const v_from_id = u16(linedef_view, i + 0);
			const v_to_id = u16(linedef_view, i + 2);
			const v_from = this.vertexes[v_from_id];
			const v_to = this.vertexes[v_to_id];
			const front_id = u16(linedef_view, i + (this.iwad.isHexen ? 12 : 10));
			const back_id = u16(linedef_view, i + (this.iwad.isHexen ? 14 : 12));
			const front = front_id == 0xFFFF ? null : this.sidedefs[front_id];
			const back = back_id == 0xFFFF ? null : this.sidedefs[back_id];
			if (v_from === undefined || v_to === undefined) {
				console.log("Cannot add linedef #%d: %d <-> %d", parseInt(i / linedef_width), v_from_id, v_to_id);
			}
			const linedef = {
				id: parseInt(i / linedef_width),
				from: v_from,
				to: v_to,
				flags: u16(linedef_view, i + 4),
				special_type: this.iwad.isHexen ? u8(linedef_view, i + 6) : u16(linedef_view, i + 6),
				tag: this.iwad.isHexen ? 0 : u16(linedef_view, i + 8),
				args: this.iwad.isHexen ? Array.from(new Uint8Array(data.linedefs.slice(i + 7, i + 12))) : [],
				back: back,
				front: front,
				segs: [],
				sector: null
			};
			[back, front].filter((x) => x).forEach((sidedef) => sidedef.linedefs.push(linedef));
			if (front) linedef.sector = front.sector;
			[front, back].forEach((sidedef) => {
				if (sidedef && sidedef.sector && !sidedef.sector.linedefs.includes(linedef)) {
					sidedef.sector.linedefs.push(linedef);
				}
			});
			this.linedefs.push(linedef);
		}
		const segs_view = dataView(data.segs);
		this.segs = [];
		for (let i = 0; i < data.segs.byteLength - 11; i += 12) {
			const seg = {
				id: parseInt(i / 12),
				from: this.vertexes[u16(segs_view, i + 0)],
				to: this.vertexes[u16(segs_view, i + 2)],
				linedef: this.linedefs[u16(segs_view, i + 6)],
				direction: u16(segs_view, i + 8)
			};
			if (!seg.linedef) continue;
			this.segs[seg.id] = seg;
			if (seg.direction == 0) {
				seg.sidedef = seg.linedef.front;
			} else {
				seg.sidedef = seg.linedef.back;
			}
			if (seg.sidedef) {
				seg.sector = seg.sidedef.sector;
			}
			seg.linedef.segs.push(seg);
		}
		const ssector_view = dataView(data.ssectors);
		this.subsectors = [];
		for (let i = 0; i < data.ssectors.byteLength - 3; i += 4) {
			const seg_count = u16(ssector_view, i);
			const first_seg = u16(ssector_view, i + 2);
			const subsector = {
				id: parseInt(i / 4),
				segs: this.segs.slice(first_seg, seg_count + first_seg).filter((seg) => seg)
			};
			subsector.vertexes = subsector.segs
				.flatMap((seg) => [seg.from, seg.to])
				.filter((v, i, s) => v && s.indexOf(v) == i);
			subsector.path = orderedSegPath(subsector.segs);
			if (subsector.vertexes.length >= 1) {
				const m = subsector.vertexes
					.reduce((a, b) => ({
						x: a.x + b.x / subsector.vertexes.length,
						y: a.y + b.y / subsector.vertexes.length
					}), {x: 0, y: 0});
				subsector.sector = subsector.segs[0].sector;
				subsector.midpoint = m;
			}
			subsector.segs.forEach((seg) => seg.subsector = subsector);
			this.subsectors.push(subsector);
		}
		this.subsectors = this.subsectors.sort((a,b) =>
			(a.sector ? a.sector.floor.height : 0) -
			(b.sector ? b.sector.floor.height : 0)
		);
		this.sectors.forEach((sector) => {
			let x = 0, y = 0, n = 0;
			sector.vertexes =
				sector.linedefs
					.flatMap((linedef) => [linedef.from, linedef.to])
					.filter((v, i, s) => s.indexOf(v) == i);
			sector.vertexes.forEach((v) => {
				x += v.x;
				y += v.y;
				n++;
			});
			if (n > 0) {
				sector.x = parseInt(x / n);
				sector.y = parseInt(y / n);
			}
			if (sector.vertexes.length >= 1) {
				const m = sector.vertexes
					.reduce((a, b) => ({
						x: a.x + b.x / sector.vertexes.length,
						y: a.y + b.y / sector.vertexes.length
					}), {x: 0, y: 0});
				sector.midpoint = m;
				sector.vertexes = sector.vertexes.sort((a,b) =>
					Math.atan2(a.y - m.y, a.x - m.x) -
					Math.atan2(b.y - m.y, b.x - m.x));
			}
			sector.paths = orderedEdgePaths(sector.linedefs);
		});
		this.sectors = this.sectors.sort((a,b) => a.floor.height - b.floor.height);
		this.things = [];
		const thingwidth = this.iwad.isHexen ? 20 : 10;
		const things_view = dataView(data.things);
		for (let i = 0; i + thingwidth - 1 < data.things.byteLength; i += thingwidth) {
			if (this.iwad.isHexen) {
				const args = new Uint8Array(data.things.slice(i + 15, i + 20));
				const thing = {
					id: parseInt(i / thingwidth),
					x: i16(things_view, i + 2),
					y: -i16(things_view, i + 4),
					tid: u16(things_view, i),
					initial_height: i16(things_view, i + 6),
					angle: u16(things_view, i + 8),
					type: u16(things_view, i + 10),
					flags: u16(things_view, i + 12),
					special: u8(things_view, i + 14),
					args: args
				};
				this.things.push(thing);
			} else {
				const thing = {
					id: parseInt(i / thingwidth),
					x: i16(things_view, i),
					y: -i16(things_view, i + 2),
					angle: u16(things_view, i + 4),
					type: u16(things_view, i + 6),
					flags: u16(things_view, i + 8),
				};
				this.things.push(thing);
			}
		}
	}
}

class Flat {
	constructor(iwad, name) {
		this.name = name;
		this.iwad = iwad;
		this.width = this.height = 64;
		this.arrayBuffer = iwad.read_lump(name);
		const data = new Uint8Array(64 * 64 * 4);
		const pixels = new Uint8Array(this.arrayBuffer);
		pixels.forEach((v, i) => {
			data[i * 4 + 0] = iwad.playpal[v * 3 + 0];
			data[i * 4 + 1] = iwad.playpal[v * 3 + 1];
			data[i * 4 + 2] = iwad.playpal[v * 3 + 2];
			data[i * 4 + 3] = 255;
		});
		this.imageData = new ImageData(new Uint8ClampedArray(data.buffer), this.width, this.height);
	}

	render($canvas, size) {
		let dx = 0, dy = 0, dw = this.width, dh = this.height;
		if (size) {
			$canvas.width = size;
			$canvas.height = size;
			const r = size / dw;
			dw *= r;
			dh *= r;
		} else {
			$canvas.width = this.width;
			$canvas.height = this.height;
		}
		const context = $canvas.getContext('2d');
		createImageBitmap(this.imageData).then((renderer) => {
			context.drawImage(renderer, 0, 0, dw, dh);
		});
	}
}

class Patch {
	constructor(iwad, name) {
		this.name = name;
		this.iwad = iwad;
		this.arrayBuffer = iwad.read_lump(name);
		const view = dataView(this.arrayBuffer);
		this.width = u16(view, 0);
		this.height = u16(view, 2);
		this.leftoffset = u16(view, 4);
		this.topoffset = u16(view, 6);
		this.columns = [];
		for (let i = 0; i < this.width; i++) {
			this.columns.push(u32(view, 8 + 4 * i));
		}
		const data = new Uint8Array(this.width * this.height * 4);
		this.columns.forEach((offset, ic) => {
			const column = this.arrayBuffer.slice(offset);
			for (let i = 0; i + 4 < column.byteLength;) {
				const [topdelta, length] = new Uint8Array(column.slice(i, i + 2));
				if (topdelta == 0xFF) break;
				i += 3; // skip unused byte
				const pixels = new Uint8Array(column.slice(i, i + length));
				pixels.forEach((v, j) => {
					j += topdelta;
					data[(ic + j * this.width) * 4 + 0] = iwad.playpal[v * 3 + 0];
					data[(ic + j * this.width) * 4 + 1] = iwad.playpal[v * 3 + 1];
					data[(ic + j * this.width) * 4 + 2] = iwad.playpal[v * 3 + 2];
					data[(ic + j * this.width) * 4 + 3] = 255;
				});
				i += length + 1;
			}
		});
		this.imageData = new ImageData(new Uint8ClampedArray(data.buffer), this.width, this.height);
	}

	render($canvas, size) {
		let dx = 0, dy = 0, dw = this.width, dh = this.height;
		if (size) {
			$canvas.width = size;
			$canvas.height = size;
			const r = size / Math.min(dw, dh);
			dw *= r;
			dh *= r;
			dx = size / 2 - dw / 2;
			dy = size / 2 - dh / 2;
		} else {
			$canvas.width = this.width;
			$canvas.height = this.height;
		}
		const context = $canvas.getContext('2d');
		createImageBitmap(this.imageData).then((renderer) => {
			context.drawImage(renderer, dx, dy, dw, dh);
		});
	}
}

const MAP_LUMPS = {
	THINGS: true,
	LINEDEFS: true,
	SIDEDEFS: true,
	VERTEXES: true,
	SEGS: true,
	SSECTORS: true,
	NODES: true,
	SECTORS: true,
	REJECT: true,
	BLOCKMAP: true,
	BEHAVIOR: true,
	DIALOGUE: true,
	ENDMAP: true,
	FLATNAME: true,
	LINES: true,
	POINTS: true,
	TEXTMAP: true,
	ZNODES: true,
	GL_VERT: true,
	GL_SEGS: true,
	GL_SSECT: true,
	GL_NODES: true,
	GL_PVS: true,
	GL_HEAD: true
};

class WAD {
	constructor(arrayBuffers) {
		if (!Array.isArray(arrayBuffers)) {
			arrayBuffers = [arrayBuffers];
		}
		this.arrayBuffers = arrayBuffers;
		this.arrayBuffer = arrayBuffers[0];
		this.files = {};
		this.patches = {};
		this.flats = {};
		this.maps = {};

		let idx = 0;
		const patchlist = [];
		const flatlist = [];
		const mapdata = {};
		arrayBuffers.forEach((arrayBuffer, wad_index) => {
			const sig4 = ascii.decode(new Uint8Array(arrayBuffer, 0, 4));
			const header = dataView(arrayBuffer);
			const lumps = u32(header, 4);
			const dir_offset = u32(header, 8);
			if (sig4 != 'IWAD' && sig4 != 'PWAD') {
				throw 'Bad input file header: ' + sig4;
			}

			if (dir_offset + lumps * 16 > arrayBuffer.byteLength) {
				throw 'Bad info table offset: ' + dir_offset;
			}

			let is_patch = false;
			let is_flat = false;
			let mapptr = null;

			for (let i = 0; i < lumps; i++) {
				const offset = dir_offset + i * 16;
				const dir = dataView(arrayBuffer.slice(offset, offset + 16));
				const pos = u32(dir, 0);
				const size = u32(dir, 4);
				const name = asciiz(arrayBuffer.slice(offset + 8, offset + 16));
				idx++;

				if (/^S\d?_START$/.exec(name)) {
					is_patch = true;
					continue;
				} else if (/^S\d?_END$/.exec(name)) {
					is_patch = false;
					continue;
				}

				if (/^F\d?_START$/.exec(name)) {
					is_flat = true;
					continue;
				} else if (/^F\d?_END$/.exec(name)) {
					is_flat = false;
					continue;
				}

				this.files[name] = {
					arrayBuffer: arrayBuffer,
					wad_index: wad_index,
					pos: pos,
					size: size,
					index: idx,
				};

				if (is_patch) {
					if (!patchlist.includes(name)) patchlist.push(name);
				} else if (is_flat) {
					if (!flatlist.includes(name)) flatlist.push(name);
				} else if (/^(E[0-9]M[0-9]|MAP[0-9][0-9])$/.exec(name)) {
					mapptr = {};
					mapdata[name] = mapptr;
				} else if (MAP_LUMPS[name] && mapptr) {
					mapptr[name.toLowerCase()] = arrayBuffer.slice(pos, pos + size);
				}
			}
		});
		if (this.files.PLAYPAL) {
			this.playpal = new Uint8Array(this.read_lump('PLAYPAL'));
		} else {
			this.playpal = new Uint8Array(256 * 3);
			for (let i = 0; i < 256; i++) {
				this.playpal[i * 3 + 0] = i;
				this.playpal[i * 3 + 1] = i;
				this.playpal[i * 3 + 2] = i;
			}
		}
		this.isHexen = !!this.files.BEHAVIOR;
		if (this.isHexen) {
			this.game = 'hexen';
		} else if (this.files.MUS_E1M1 || this.files.MUS_TITL || this.files.WZRD || this.files.MNTR) {
			this.game = 'heretic';
		} else {
			this.game = 'doom';
		}
		patchlist.forEach((name) => {
			this.patches[name] = new Patch(this, name);
		});
		flatlist.forEach((name) => {
			this.flats[name] = new Flat(this, name);
		});
		if (this.files.MAPINFO) {
			this.mapinfo = new MapInfo(this.read_lump('MAPINFO'));
		} else {
			this.mapinfo = {maps: {}};
		}
		Object.keys(mapdata).forEach((name) => {
			if (mapdata[name].things && mapdata[name].linedefs && mapdata[name].sidedefs &&
				mapdata[name].vertexes && mapdata[name].sectors &&
				mapdata[name].segs && mapdata[name].ssectors) {
				this.maps[name] = new DoomMap(this, name, mapdata[name]);
			}
		});
	}

	read_lump(name) {
		const file = this.files[name];
		if (!file) {
			throw 'File not found: ' + name;
		}
		if (file.pos + file.size > file.arrayBuffer.byteLength) {
			throw 'File ' + name + ' has invalid offset or position';
		}
		return file.arrayBuffer.slice(file.pos, file.pos + file.size);
	}
}

// vim: ai:ts=8:sw=8:noet:syntax=js
