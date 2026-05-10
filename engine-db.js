// Engine Database — free manual links and specs for common marine engines
// All links point to publicly available, free resources
// Expanded: May 2026 — 50+ engines across all major brands

const ENGINE_DB = {

  // ═══════════════════════════════════════════════════════════════════════════
  // YANMAR
  // ═══════════════════════════════════════════════════════════════════════════

  'yanmar 1gm': {
    name: 'Yanmar 1GM / 1GM10',
    type: 'diesel', cylinders: 1, displacement: '0.33L',
    horsepower: '9hp', rpm: '3600',
    oilCapacity: '1.5L', oilSpec: 'SAE 30 CF or CD',
    coolantType: 'Raw water cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '200hrs or annually',
    torqueSpecs: { headBolt: '47 Nm (35 ft-lb)', mainBearing: '69 Nm (51 ft-lb)', rodBearing: '39 Nm (29 ft-lb)' },
    parts: { impellerPartNum: '128177-42500', oilFilterPartNum: '119305-35150', fuelFilterPartNum: '129574-55810' },
    manuals: [
      { label: 'User Manual — 1GM/2GM/3GM (ManualsLib)', url: 'https://www.manualslib.com/manual/1041663/Yanmar-1gm.html' },
      { label: 'Shop Manual — 1GM/2GM/3GM (ManualsLib)', url: 'https://www.manualslib.com/manual/1001856/Yanmar-1gm.html' },
      { label: 'Operation Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/822571/Yanmar-1gm.html' },
      { label: 'GM/HM Workshop Manual (L-36.com)', url: 'https://l-36.com/manuals.php' },
      { label: 'Yanmar Support & Catalogs', url: 'https://www.yanmar.com/us/support/catalogs/' },
    ],
    commonIssues: [
      'Raw water pump impeller failure (annual replacement recommended)',
      'Zinc anode corrosion on heat exchanger/manifold',
      'Injector fouling from low-load/idle running',
      'Bleed screw seizing on fuel filters',
      'Exhaust elbow carbon buildup',
    ]
  },

  'yanmar 2gm': {
    name: 'Yanmar 2GM / 2GM20',
    type: 'diesel', cylinders: 2, displacement: '0.66L',
    horsepower: '18hp', rpm: '3600',
    oilCapacity: '2.0L', oilSpec: 'SAE 30 CF or CD',
    coolantType: 'Raw water cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '200hrs or annually',
    torqueSpecs: { headBolt: '47 Nm (35 ft-lb)', mainBearing: '69 Nm (51 ft-lb)', rodBearing: '39 Nm (29 ft-lb)' },
    parts: { impellerPartNum: '128177-42500', oilFilterPartNum: '119305-35150', fuelFilterPartNum: '129574-55810' },
    manuals: [
      { label: 'User Manual — 1GM/2GM/3GM (ManualsLib)', url: 'https://www.manualslib.com/manual/1041663/Yanmar-1gm.html' },
      { label: 'Shop Manual — 1GM/2GM/3GM (ManualsLib)', url: 'https://www.manualslib.com/manual/1001856/Yanmar-1gm.html' },
      { label: '2GM Product Page (ManualsLib)', url: 'https://www.manualslib.com/products/Yanmar-2gm-3593376.html' },
      { label: 'Yanmar Support & Catalogs', url: 'https://www.yanmar.com/us/support/catalogs/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Thermostat failure causing overheating',
      'Zincs corroding away unnoticed',
      'Injector wear from contaminated fuel',
      'Timing belt deterioration',
    ]
  },

  'yanmar 3gm': {
    name: 'Yanmar 3GM / 3GM30',
    type: 'diesel', cylinders: 3, displacement: '0.99L',
    horsepower: '27hp', rpm: '3600',
    oilCapacity: '2.5L', oilSpec: 'SAE 30 CF or CD',
    coolantType: 'Raw water cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '200hrs or annually',
    torqueSpecs: { headBolt: '47 Nm (35 ft-lb)', mainBearing: '69 Nm (51 ft-lb)', rodBearing: '39 Nm (29 ft-lb)' },
    parts: { impellerPartNum: '128177-42500', oilFilterPartNum: '119305-35150', fuelFilterPartNum: '129574-55810' },
    manuals: [
      { label: 'User Manual — 1GM/2GM/3GM (ManualsLib)', url: 'https://www.manualslib.com/manual/1041663/Yanmar-1gm.html' },
      { label: 'Shop Manual — 1GM/2GM/3GM (ManualsLib)', url: 'https://www.manualslib.com/manual/1001856/Yanmar-1gm.html' },
      { label: 'Yanmar Support & Catalogs', url: 'https://www.yanmar.com/us/support/catalogs/' },
    ],
    commonIssues: [
      'Impeller failure (most common)',
      'Heat exchanger scale buildup',
      'Injector wear',
      'Belt tension loss',
      'Zinc anode neglect',
    ]
  },

  'yanmar 3hm': {
    name: 'Yanmar 3HM / 3HM35',
    type: 'diesel', cylinders: 3, displacement: '0.99L',
    horsepower: '35hp', rpm: '3600',
    oilCapacity: '2.5L', oilSpec: 'SAE 30 CF or CD',
    coolantType: 'Raw water cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '200hrs or annually',
    parts: { impellerPartNum: '128177-42500', oilFilterPartNum: '119305-35150', fuelFilterPartNum: '129574-55810' },
    manuals: [
      { label: 'User Manual — 1GM/2GM/3GM/3HM (ManualsLib)', url: 'https://www.manualslib.com/manual/1041663/Yanmar-1gm.html' },
      { label: 'Shop Manual — includes 3HM (ManualsLib)', url: 'https://www.manualslib.com/manual/1001856/Yanmar-1gm.html' },
      { label: 'Yanmar Support', url: 'https://www.yanmar.com/us/support/catalogs/' },
    ],
    commonIssues: [
      'Raw water impeller failure',
      'Heat exchanger fouling',
      'Governor hunting at idle',
      'Fuel system air leaks',
    ]
  },

  'yanmar 4jh': {
    name: 'Yanmar 4JH / 4JH2 / 4JH3 / 4JH4',
    type: 'diesel', cylinders: 4, displacement: '1.64L',
    horsepower: '40-80hp', rpm: '3800',
    oilCapacity: '4.5L', oilSpec: 'SAE 15W-40 CD/CE',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '300hrs or annually',
    torqueSpecs: { headBolt: '98 Nm (72 ft-lb)', mainBearing: '103 Nm (76 ft-lb)', rodBearing: '59 Nm (44 ft-lb)' },
    parts: { impellerPartNum: '129470-42531', oilFilterPartNum: '119305-35151', fuelFilterPartNum: '129574-55801' },
    manuals: [
      { label: '4JH2E Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/737938/Yanmar-4jh2e.html' },
      { label: '4JH3-TE Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/740012/Yanmar-4jh3-Te.html' },
      { label: '4JH4E Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Yanmar-4jh4e-6908111.html' },
      { label: 'Yanmar Support & Catalogs', url: 'https://www.yanmar.com/us/support/catalogs/' },
    ],
    commonIssues: [
      'Turbo lag or turbo failure (4JH2-TE/4JH3-TE)',
      'Intercooler scale buildup reducing power',
      'Injector pump wear causing hard starting',
      'Heat exchanger fouling',
      'Exhaust elbow corrosion and blockage',
    ]
  },

  'yanmar 6ly': {
    name: 'Yanmar 6LY / 6LY2 / 6LY3',
    type: 'diesel', cylinders: 6, displacement: '5.17L',
    horsepower: '315-440hp', rpm: '3300',
    oilCapacity: '14.5L', oilSpec: 'SAE 15W-40 CF-4 or CG-4',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '250hrs or annually',
    transmissionOilInterval: '500hrs or annually',
    parts: { impellerPartNum: '129574-42510', oilFilterPartNum: '129574-35152', fuelFilterPartNum: '129574-55810' },
    manuals: [
      { label: 'Yanmar 6LY Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/yanmar/' },
      { label: 'Yanmar Support & Catalogs', url: 'https://www.yanmar.com/us/support/catalogs/' },
    ],
    commonIssues: [
      'Turbocharger failure',
      'Injector fouling',
      'Heat exchanger scaling on high-hour engines',
      'Intercooler corrosion',
      'Gear oil leaks at ZF transmission',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VOLVO PENTA
  // ═══════════════════════════════════════════════════════════════════════════

  'volvo penta md2': {
    name: 'Volvo Penta MD2 / MD2B',
    type: 'diesel', cylinders: 2, displacement: '0.82L',
    horsepower: '11-18hp', rpm: '3600',
    oilCapacity: '2.0L', oilSpec: 'SAE 30 CD',
    coolantType: 'Raw water or freshwater cooled',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    parts: { impellerPartNum: '21951346', oilFilterPartNum: '835440', fuelFilterPartNum: '873589' },
    manuals: [
      { label: 'MD1/D1/MD2/D2 Workshop Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals9/Volvo_MD1-D1-MD2-D2.pdf&title=Volvo+Penta+Md1+D1+Md2+D2+Workshop+Manual' },
      { label: 'MD2B Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Volvo-Penta-Md2b-3969419.html' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Impeller failure on raw water pump',
      'Injector fouling from low-quality diesel',
      'Raw water pump seal leak',
      'Fuel lift pump diaphragm failure',
      'Zinc anode corrosion',
    ]
  },

  'volvo penta md7': {
    name: 'Volvo Penta MD7A',
    type: 'diesel', cylinders: 2, displacement: '1.18L',
    horsepower: '13hp', rpm: '3000',
    oilCapacity: '2.0L', oilSpec: 'SAE 30 CD',
    coolantType: 'Raw water cooled',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'MD7A Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Volvo-Penta-Md7a-4111404.html' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Injector fouling',
      'Thermostat failure',
      'Governor hunting at idle',
    ]
  },

  'volvo penta md11': {
    name: 'Volvo Penta MD11C / MD17C',
    type: 'diesel', cylinders: 2, displacement: '1.10L',
    horsepower: '17-25hp', rpm: '3000',
    oilCapacity: '2.6L', oilSpec: 'SAE CD lubricating oil',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'MD11C/MD17C Instruction Book (ManualsLib)', url: 'https://www.manualslib.com/manual/1051002/Volvo-Penta-Md-11c-110s.html' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Heat exchanger scale',
      'Decompression lever sticking',
      'Fuel system air ingestion',
    ]
  },

  'volvo penta md21': {
    name: 'Volvo Penta MD21 / TMD21',
    type: 'diesel', cylinders: 4, displacement: '2.00L',
    horsepower: '50-70hp', rpm: '3600',
    oilCapacity: '4.5L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'MD21A Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1038099/Volvo-Penta-Md21a.html' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Impeller failure',
      'Injector pump wear',
      'Turbo issues on TMD21',
    ]
  },

  'volvo penta md22': {
    name: 'Volvo Penta MD22 / TMD22 / TAMD22',
    type: 'diesel', cylinders: 4, displacement: '2.00L',
    horsepower: '55-95hp', rpm: '3600',
    oilCapacity: '4.5L', oilSpec: 'SAE 15W-40 ACEA E3',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '150hrs',
    transmissionOilInterval: '300hrs',
    torqueSpecs: { headBolt: '90 Nm (66 ft-lb)', mainBearing: '100 Nm (74 ft-lb)', rodBearing: '60 Nm (44 ft-lb)' },
    parts: { impellerPartNum: '21951346', oilFilterPartNum: '835440', fuelFilterPartNum: '873589' },
    manuals: [
      { label: 'MD22 Workshop Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/840880/Volvo-Penta-Md22.html' },
      { label: 'MD22L Instruction Book (ManualsLib)', url: 'https://www.manualslib.com/manual/817854/Volvo-Penta-Md22l.html' },
      { label: 'MD22 Manuals List (ManualsLib)', url: 'https://www.manualslib.com/products/Volvo-Penta-Md22-3630483.html' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Heat exchanger fouling/corrosion',
      'Turbocharger issues (TAMD22)',
      'Injector wear',
      'Bellows on outdrive failing',
    ]
  },

  'volvo penta 2002': {
    name: 'Volvo Penta 2001 / 2002 / 2003',
    type: 'diesel', cylinders: 2, displacement: '0.80L',
    horsepower: '10-28hp', rpm: '3600',
    oilCapacity: '1.7L', oilSpec: 'SAE 30 CD or 15W-40',
    coolantType: 'Raw water cooled',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    parts: { impellerPartNum: '21951346' },
    manuals: [
      { label: '2001/2002/2003 Owner Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1001859/Volvo-Penta-2001.html' },
      { label: '2002 Manuals List (ManualsLib)', url: 'https://www.manualslib.com/products/Volvo-Penta-2002-3967500.html' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Injector fouling on 2002/2003',
      'Thermostat failure',
      'Fuel lift pump diaphragm',
      'Governor hunting',
    ]
  },

  'volvo penta d1': {
    name: 'Volvo Penta D1-13 / D1-20 / D1-30',
    type: 'diesel', cylinders: 3, displacement: '0.98L',
    horsepower: '13-30hp', rpm: '3600',
    oilCapacity: '2.8L', oilSpec: 'SAE 15W-40 ACEA E3',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '150hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '21951346', oilFilterPartNum: '3581078' },
    manuals: [
      { label: 'MD1/D1 Workshop Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals9/Volvo_MD1-D1-MD2-D2.pdf&title=Volvo+Penta+Md1+D1+Md2+D2+Workshop+Manual' },
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Impeller wear',
      'Thermostat failure',
      'Serpentine belt wear',
    ]
  },

  'volvo penta d2': {
    name: 'Volvo Penta D2-40 / D2-50 / D2-55 / D2-60 / D2-75',
    type: 'diesel', cylinders: 4, displacement: '1.50L',
    horsepower: '40-75hp', rpm: '3600',
    oilCapacity: '4.5L', oilSpec: 'SAE 15W-40 ACEA E3',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '150hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '21951346', oilFilterPartNum: '3581078', fuelFilterPartNum: '3840525' },
    manuals: [
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
      { label: 'Volvo Penta Brand Page (ManualsLib)', url: 'https://www.manualslib.com/brand/volvo-penta/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Impeller failure',
      'Injector wear',
      'Turbo issues on larger models',
      'EGR valve clogging (later models)',
    ]
  },

  'volvo penta d3': {
    name: 'Volvo Penta D3-110 / D3-140 / D3-150 / D3-170 / D3-200',
    type: 'diesel', cylinders: 6, displacement: '2.40L',
    horsepower: '110-200hp', rpm: '3500',
    oilCapacity: '7.0L', oilSpec: 'SAE 15W-40 ACEA E3 or VDS-3',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    parts: { impellerPartNum: '21951346', oilFilterPartNum: '3840525' },
    manuals: [
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
      { label: 'Volvo Penta Brand Page (ManualsLib)', url: 'https://www.manualslib.com/brand/volvo-penta/' },
    ],
    commonIssues: [
      'EGR valve fouling',
      'Injector wear',
      'Heat exchanger scaling',
      'Transmission oil contamination',
    ]
  },

  'volvo penta d4': {
    name: 'Volvo Penta D4-180 / D4-210 / D4-230 / D4-260 / D4-300',
    type: 'diesel', cylinders: 4, displacement: '3.70L',
    horsepower: '180-300hp', rpm: '3500',
    oilCapacity: '9.0L', oilSpec: 'SAE 15W-40 VDS-3',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    manuals: [
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
      { label: 'Volvo Penta Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/393504/Volvo-Penta-Penta-Manual-Service.html' },
    ],
    commonIssues: [
      'Turbocharger issues',
      'EGR valve fouling',
      'Injector wear',
      'Heat exchanger fouling',
      'DPS outdrive bellows',
    ]
  },

  'volvo penta d6': {
    name: 'Volvo Penta D6-280 / D6-310 / D6-340 / D6-370 / D6-400 / D6-435',
    type: 'diesel', cylinders: 6, displacement: '5.50L',
    horsepower: '280-435hp', rpm: '3500',
    oilCapacity: '14.0L', oilSpec: 'SAE 15W-40 VDS-3',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    manuals: [
      { label: 'Volvo Penta Manuals Portal', url: 'https://www.volvopenta.com/your-engine/manuals-and-handbooks/' },
      { label: 'Volvo Penta Brand Page (ManualsLib)', url: 'https://www.manualslib.com/brand/volvo-penta/' },
    ],
    commonIssues: [
      'Turbocharger failure',
      'EGR cooler failure causing coolant loss',
      'Injector calibration drift',
      'DPS/IPS outdrive joint wear',
      'Heat exchanger scaling',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIVERSAL / WESTERBEKE
  // ═══════════════════════════════════════════════════════════════════════════

  'universal m12': {
    name: 'Universal M-12 / Atomic 4 (diesel variant)',
    type: 'diesel', cylinders: 2, displacement: '0.6L',
    horsepower: '12hp', rpm: '3000',
    oilCapacity: '2.5L', oilSpec: 'SAE 30 CD',
    coolantType: 'Raw water cooled',
    impellerInterval: 'Annually',
    oilChangeInterval: '50hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Universal Marine Engines (ManualsLib)', url: 'https://www.manualslib.com/brand/universal/marine-engine/' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Injector issues',
      'Fuel lift pump wear',
      'Exhaust manifold corrosion',
    ]
  },

  'universal m18': {
    name: 'Universal M-18 / Atomic 4',
    type: 'gasoline', cylinders: 4, displacement: '1.4L',
    horsepower: '18hp', rpm: '3000',
    oilCapacity: '3.0L', oilSpec: 'SAE 30 SF/SG',
    coolantType: 'Raw water cooled',
    impellerInterval: 'Annually',
    oilChangeInterval: '50hrs',
    transmissionOilInterval: '200hrs',
    parts: { impellerPartNum: '7802' },
    manuals: [
      { label: 'Westerbeke M-18 Parts Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/598911/Westerbeke-M-18.html' },
      { label: 'Universal Marine Engines (ManualsLib)', url: 'https://www.manualslib.com/brand/universal/marine-engine/' },
      { label: 'Westerbeke Marine Installation Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals%2FWesterbeke-Marine-Engine-Installation-Manual&page=0&title=' },
    ],
    commonIssues: [
      'Carburetor fuel delivery issues',
      'Raw water pump seal failure',
      'Distributor points wear (older units)',
      'Water pump shaft seal failure',
      'Ignition timing drift',
    ]
  },

  'universal m25': {
    name: 'Universal M-25 / M-25XP',
    type: 'diesel', cylinders: 3, displacement: '0.9L',
    horsepower: '25hp', rpm: '3600',
    oilCapacity: '2.8L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Universal Marine Engines (ManualsLib)', url: 'https://www.manualslib.com/brand/universal/marine-engine/' },
      { label: 'Westerbeke Marine Installation Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals%2FWesterbeke-Marine-Engine-Installation-Manual&page=0&title=' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Injector wear',
      'Raw water impeller failure',
      'Zincs corroding',
      'Fuel filter clogging',
    ]
  },

  'universal m35': {
    name: 'Universal M-35 / M-35B',
    type: 'diesel', cylinders: 4, displacement: '1.5L',
    horsepower: '35hp', rpm: '3600',
    oilCapacity: '3.5L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Universal Marine Engines (ManualsLib)', url: 'https://www.manualslib.com/brand/universal/marine-engine/' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Heat exchanger scaling',
      'Impeller failure',
      'Injector fouling',
      'Drive belt wear',
    ]
  },

  'universal m40': {
    name: 'Universal M-40',
    type: 'diesel', cylinders: 4, displacement: '1.7L',
    horsepower: '40hp', rpm: '3600',
    oilCapacity: '3.5L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Universal Marine Engines (ManualsLib)', url: 'https://www.manualslib.com/brand/universal/marine-engine/' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Heat exchanger scaling',
      'Impeller failure',
      'Injector wear',
      'Thermostat failure',
    ]
  },

  'universal m50': {
    name: 'Universal M-50',
    type: 'diesel', cylinders: 4, displacement: '2.0L',
    horsepower: '50hp', rpm: '3600',
    oilCapacity: '4.0L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Universal Marine Engines (ManualsLib)', url: 'https://www.manualslib.com/brand/universal/marine-engine/' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
      { label: 'Westerbeke Marine Installation Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals%2FWesterbeke-Marine-Engine-Installation-Manual&page=0&title=' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Injector wear',
      'Thermostat failure',
      'Zinc anode neglect',
    ]
  },

  // ─── WESTERBEKE ──────────────────────────────────────────────────────────

  'westerbeke w13': {
    name: 'Westerbeke W13 / 13B Two',
    type: 'diesel', cylinders: 2, displacement: '0.80L',
    horsepower: '13hp', rpm: '3600',
    oilCapacity: '2.5L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: '12B Two Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/681471/Westerbeke-12b-Two.html' },
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
      { label: 'Westerbeke Marine Installation Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals%2FWesterbeke-Marine-Engine-Installation-Manual&page=0&title=' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Fuel filter clogging',
      'Zincs',
    ]
  },

  'westerbeke w21': {
    name: 'Westerbeke W21 / 20B Two',
    type: 'diesel', cylinders: 2, displacement: '1.0L',
    horsepower: '21hp', rpm: '3600',
    oilCapacity: '2.8L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: '20B Two Technical Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/598919/Westerbeke-20b-Two.html' },
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
      { label: 'L-36.com Marine Manuals', url: 'https://l-36.com/manuals.php' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Injector issues',
      'Zincs',
    ]
  },

  'westerbeke w30': {
    name: 'Westerbeke W30 / 30B Three',
    type: 'diesel', cylinders: 3, displacement: '1.5L',
    horsepower: '30hp', rpm: '3600',
    oilCapacity: '3.5L', oilSpec: 'SAE 30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: '20B/30B Technical Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/598919/Westerbeke-20b-Two.html' },
      { label: '30B Parts List (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals11/37115_rev2_12C_20B_30B_Parts_List.pdf&title=Westerbeke+Diesel++30b+Three+++++Operator\'s+Manual' },
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water pump failure',
      'Injector issues',
      'Zincs',
    ]
  },

  'westerbeke w40': {
    name: 'Westerbeke W40 / 42B Four',
    type: 'diesel', cylinders: 4, displacement: '1.8L',
    horsepower: '40hp', rpm: '3600',
    oilCapacity: '4.0L', oilSpec: 'SAE 30 CD or 15W-40',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: '42B Four Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Westerbeke-42b-Four-3245530.html' },
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Injector wear',
      'Thermostat failure',
    ]
  },

  'westerbeke w50': {
    name: 'Westerbeke W50 / Four-107',
    type: 'diesel', cylinders: 4, displacement: '1.75L',
    horsepower: '50hp', rpm: '3600',
    oilCapacity: '4.5L', oilSpec: 'SAE 30 CD or 15W-40',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Four-107 Service Manual (ManualsLib)', url: 'https://www.manualslib.com/products/Westerbeke-Four-107-9615186.html' },
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
      { label: 'Westerbeke Marine Installation Manual (L-36.com)', url: 'https://l-36.com/read_pdf.php?file=manuals%2FWesterbeke-Marine-Engine-Installation-Manual&page=0&title=' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Injector wear',
      'Thermostat failure',
      'Fuel filter clogging',
    ]
  },

  'westerbeke 4-107': {
    name: 'Westerbeke 4-107 / Four 107',
    type: 'diesel', cylinders: 4, displacement: '1.75L',
    horsepower: '50hp', rpm: '3600',
    oilCapacity: '4.5L', oilSpec: 'SAE 30 CD or 15W-40',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Four-107 Service Manual (ManualsLib)', url: 'https://www.manualslib.com/products/Westerbeke-Four-107-9615186.html' },
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Injector issues from algae-contaminated diesel',
      'Throttle cable wear',
    ]
  },

  'westerbeke 4-108': {
    name: 'Westerbeke 4-108',
    type: 'diesel', cylinders: 4, displacement: '1.77L',
    horsepower: '50-55hp', rpm: '3600',
    oilCapacity: '4.5L', oilSpec: 'SAE 30 CD or 15W-40',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
      { label: 'Four-107 Service Manual (ManualsLib — similar engine)', url: 'https://www.manualslib.com/products/Westerbeke-Four-107-9615186.html' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Impeller failure',
      'Injector wear',
      'Thermostat failure',
    ]
  },

  'westerbeke 4-154': {
    name: 'Westerbeke 4-154',
    type: 'diesel', cylinders: 4, displacement: '2.53L',
    horsepower: '62hp', rpm: '3000',
    oilCapacity: '5.5L', oilSpec: 'SAE 30 CD or 15W-40',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Westerbeke Corp Manuals', url: 'https://www.westerbeke.com/support/manuals/' },
    ],
    commonIssues: [
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Injector pump wear',
      'Thermostat failure',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PERKINS MARINE
  // ═══════════════════════════════════════════════════════════════════════════

  'perkins 4.107': {
    name: 'Perkins 4.107(M)',
    type: 'diesel', cylinders: 4, displacement: '1.76L',
    horsepower: '40hp', rpm: '4000',
    oilCapacity: '4.3L', oilSpec: 'SAE 10W-30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    torqueSpecs: { headBolt: '88 Nm (65 ft-lb)', mainBearing: '108 Nm (80 ft-lb)', rodBearing: '61 Nm (45 ft-lb)' },
    manuals: [
      { label: '4.107(M) Handbook (ManualsLib)', url: 'https://www.manualslib.com/manual/1010143/Perkins-4-107-M.html' },
      { label: 'Perkins Downloads & Resources', url: 'https://www.perkins.com/en_GB/support/resources-and-downloads.html' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Fuel lift pump diaphragm failure',
      'Injector nozzle wear',
      'Heat exchanger scaling',
      'Thermostat failure',
    ]
  },

  'perkins 4.108': {
    name: 'Perkins 4.108(M)',
    type: 'diesel', cylinders: 4, displacement: '1.77L',
    horsepower: '47hp', rpm: '4000',
    oilCapacity: '4.5L', oilSpec: 'SAE 10W-30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    torqueSpecs: { headBolt: '88 Nm (65 ft-lb)', mainBearing: '108 Nm (80 ft-lb)', rodBearing: '61 Nm (45 ft-lb)' },
    parts: { oilFilterPartNum: '2654403', fuelFilterPartNum: '2656F843' },
    manuals: [
      { label: '4.107(M)/4.108(M) Handbook (ManualsLib)', url: 'https://www.manualslib.com/manual/1010143/Perkins-4-107-M.html' },
      { label: '4.108 Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/perkins/marine-engine/' },
      { label: 'Perkins Downloads & Resources', url: 'https://www.perkins.com/en_GB/support/resources-and-downloads.html' },
    ],
    commonIssues: [
      'Injector pump wear causing hard starting',
      'Raw water pump impeller failure',
      'Heat exchanger fouling',
      'Fuel lift pump failure',
      'Thermostat failure',
    ]
  },

  'perkins 4.154': {
    name: 'Perkins 4.154(M)',
    type: 'diesel', cylinders: 4, displacement: '2.53L',
    horsepower: '62hp', rpm: '3600',
    oilCapacity: '5.5L', oilSpec: 'SAE 10W-30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: '4.154 Workshop Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/997717/Perkins-4-154.html' },
      { label: '4.107(M) Handbook — covers 4.154(M) (ManualsLib)', url: 'https://www.manualslib.com/manual/1010143/Perkins-4-107-M.html' },
      { label: 'Perkins Downloads & Resources', url: 'https://www.perkins.com/en_GB/support/resources-and-downloads.html' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Injector pump wear',
      'Heat exchanger fouling',
      'Thermostat failure',
    ]
  },

  'perkins 6.354': {
    name: 'Perkins 6.354(M) / T6.354(M)',
    type: 'diesel', cylinders: 6, displacement: '5.80L',
    horsepower: '115-165hp', rpm: '2800',
    oilCapacity: '9.5L', oilSpec: 'SAE 10W-30 CD',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    torqueSpecs: { headBolt: '116 Nm (86 ft-lb)', mainBearing: '140 Nm (103 ft-lb)', rodBearing: '75 Nm (55 ft-lb)' },
    manuals: [
      { label: '4.107(M)/6.354(M) Handbook (ManualsLib)', url: 'https://www.manualslib.com/manual/1010143/Perkins-4-107-M.html' },
      { label: '6.354 Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Perkins-6-354-3969745.html' },
      { label: '6.354(M) Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Perkins-6-354-M-3981409.html' },
      { label: 'Perkins Downloads & Resources', url: 'https://www.perkins.com/en_GB/support/resources-and-downloads.html' },
    ],
    commonIssues: [
      'Injector pump wear',
      'Heat exchanger scaling on high-hour engines',
      'Turbocharger failure (T6.354)',
      'Raw water pump impeller failure',
      'Crankshaft front seal leaks',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MERCURY / MERCRUISER
  // ═══════════════════════════════════════════════════════════════════════════

  'mercruiser 3.0': {
    name: 'MerCruiser 3.0L / 3.0 LX',
    type: 'gasoline', cylinders: 4, displacement: '3.0L',
    horsepower: '135hp', rpm: '4400',
    oilCapacity: '3.8L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Raw water cooled (open cooling)',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '47-8M0100526', oilFilterPartNum: '35-866340Q03' },
    manuals: [
      { label: 'Alpha/Bravo Installation Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/797538/Mercury-Alpha.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Impeller failure in water pump',
      'Thermostat housing corrosion',
      'Carburetor issues',
      'Alpha One outdrive bellows',
      'Gimbal bearing wear',
    ]
  },

  'mercruiser 4.3': {
    name: 'MerCruiser 4.3L / 4.3 MPI / 4.3 MPI Alpha / Bravo',
    type: 'gasoline', cylinders: 6, displacement: '4.3L',
    horsepower: '190-220hp', rpm: '4600',
    oilCapacity: '4.7L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Freshwater cooled (closed cooling system optional)',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '47-8M0100526', oilFilterPartNum: '35-866340Q03' },
    manuals: [
      { label: '4.3L Alpha Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1060705/Mercury-Mercruiser-Mcm-4-3l-Alpha.html' },
      { label: 'Alpha/Bravo Installation Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/797538/Mercury-Alpha.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Thermostat failure',
      'Spider gear failure in Alpha One outdrive',
      'Bellows deterioration',
      'Gimbal bearing wear',
      'Distributor cap/rotor corrosion',
    ]
  },

  'mercruiser 5.0': {
    name: 'MerCruiser 5.0L / 5.0 MPI',
    type: 'gasoline', cylinders: 8, displacement: '5.0L',
    horsepower: '220-260hp', rpm: '4600',
    oilCapacity: '4.7L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Freshwater cooled (closed cooling)',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '47-8M0100526', oilFilterPartNum: '35-866340Q03' },
    manuals: [
      { label: 'Alpha/Bravo Installation Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/797538/Mercury-Alpha.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Thermostat housing issues',
      'Alpha One/Bravo outdrive service',
      'Water pump housing corrosion',
      'Bellows failure',
    ]
  },

  'mercruiser 5.7': {
    name: 'MerCruiser 5.7L / 350 Mag / 5.7 MPI',
    type: 'gasoline', cylinders: 8, displacement: '5.7L',
    horsepower: '250-300hp', rpm: '4600',
    oilCapacity: '4.7L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Freshwater cooled (closed cooling)',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '47-8M0100526', oilFilterPartNum: '35-866340Q03' },
    manuals: [
      { label: 'Alpha/Bravo Owner Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/816578/Mercury-Alpha.html' },
      { label: 'MerCruiser Alpha Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/2924895/Mercury-Mercruiser-Alpha.html' },
      { label: 'Bravo Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1348074/Mercury-Bravo.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Outdrive bellows failure',
      'Gimbal bearing wear',
      'Thermostat housing corrosion',
      'Spider gear failure (Alpha One)',
    ]
  },

  'mercruiser 7.4': {
    name: 'MerCruiser 7.4L / 454 Mag / 7.4 TKS / 502 Mag',
    type: 'gasoline', cylinders: 8, displacement: '7.4L',
    horsepower: '310-385hp', rpm: '4400',
    oilCapacity: '6.6L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Freshwater cooled (closed cooling)',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '300hrs',
    parts: { impellerPartNum: '47-8M0100526', oilFilterPartNum: '35-866340Q03' },
    manuals: [
      { label: 'Bravo Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1348074/Mercury-Bravo.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Impeller failure',
      'Outdrive bellows failure',
      'Carburetor/TKS throttle body issues',
      'Overheating from raw water pump housing corrosion',
      'Gimbal bearing wear',
    ]
  },

  'mercruiser alpha one': {
    name: 'MerCruiser Alpha One Outdrive',
    type: 'gasoline', cylinders: 0, displacement: 'N/A (outdrive unit)',
    horsepower: 'N/A', rpm: 'N/A',
    oilCapacity: '0.946L (1 qt)', oilSpec: 'SAE 80W-90 Gear Lube',
    coolantType: 'N/A',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '100hrs or annually',
    parts: { impellerPartNum: '47-8M0100526' },
    manuals: [
      { label: 'Alpha Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/2924895/Mercury-Mercruiser-Alpha.html' },
      { label: 'Alpha/Bravo Installation Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/797538/Mercury-Alpha.html' },
      { label: 'Alpha Owner Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/816578/Mercury-Alpha.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Bellows failure causing water intrusion and spider gear destruction',
      'Spider/spline gear wear',
      'Gimbal bearing wear',
      'Water pump impeller failure',
      'Trim piston seal leak',
      'U-joint failure',
    ]
  },

  'mercruiser bravo': {
    name: 'MerCruiser Bravo I / Bravo II / Bravo III',
    type: 'gasoline', cylinders: 0, displacement: 'N/A (outdrive unit)',
    horsepower: 'N/A', rpm: 'N/A',
    oilCapacity: '1.2-1.6L', oilSpec: 'SAE 80W-90 Gear Lube',
    coolantType: 'N/A',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs or annually',
    transmissionOilInterval: '100hrs or annually',
    manuals: [
      { label: 'MerCruiser Alpha/Bravo I/II/III Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/2924895/Mercury-Mercruiser-Alpha.html' },
      { label: 'Bravo Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1348074/Mercury-Bravo.html' },
      { label: 'MerCruiser Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Bellows deterioration (U-joint, exhaust, shift)',
      'Gimbal bearing wear/failure',
      'Water pump impeller failure',
      'Prop shaft seal leaks',
      'Trim cylinder seal failure',
      'Drive shaft spline wear',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CRUSADER
  // ═══════════════════════════════════════════════════════════════════════════

  'crusader 270': {
    name: 'Crusader 270 (Ford 302)',
    type: 'gasoline', cylinders: 8, displacement: '4.9L',
    horsepower: '270hp', rpm: '4400',
    oilCapacity: '4.7L', oilSpec: 'SAE 30 or 10W-30 SF/SG Marine',
    coolantType: 'Freshwater cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Mercury Marine Service Manual Lookup', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Heat exchanger corrosion',
      'Thermostat failure',
      'Carburetor issues',
      'Distributor cap corrosion',
    ]
  },

  'crusader 302': {
    name: 'Crusader 302 (Ford 302 5.0L)',
    type: 'gasoline', cylinders: 8, displacement: '4.9L',
    horsepower: '240-270hp', rpm: '4400',
    oilCapacity: '4.7L', oilSpec: 'SAE 30 Marine or 10W-30',
    coolantType: 'Freshwater cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'MerCruiser Service Manual Lookup (similar engine)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Raw water impeller failure',
      'Thermostat failure',
      'Carburetor fuel delivery issues',
      'Distributor corrosion',
      'Exhaust manifold corrosion',
    ]
  },

  'crusader 350': {
    name: 'Crusader 350 (GM 350 5.7L)',
    type: 'gasoline', cylinders: 8, displacement: '5.7L',
    horsepower: '260-330hp', rpm: '4600',
    oilCapacity: '4.7L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Freshwater cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'MerCruiser Service Manual Lookup (similar 5.7L)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Thermostat failure',
      'Exhaust manifold water jacket corrosion',
      'Carburetor/fuel injector issues',
      'Distributor corrosion',
    ]
  },

  'crusader 454': {
    name: 'Crusader 454 (GM 454 7.4L)',
    type: 'gasoline', cylinders: 8, displacement: '7.4L',
    horsepower: '330-385hp', rpm: '4400',
    oilCapacity: '6.6L', oilSpec: '25W-40 Marine Oil',
    coolantType: 'Freshwater cooled',
    impellerInterval: '200hrs or annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'MerCruiser Service Manual Lookup (similar 7.4L)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Exhaust manifold water jacket corrosion',
      'Thermostat failure',
      'Fuel delivery issues',
      'Overheat from blocked cooling passages',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEHMAN (FORD)
  // ═══════════════════════════════════════════════════════════════════════════

  'lehman 120': {
    name: 'Lehman Ford 120 / SP120',
    type: 'diesel', cylinders: 4, displacement: '2.36L',
    horsepower: '120hp', rpm: '2800',
    oilCapacity: '5.7L', oilSpec: 'SAE 30 CD or Ford M2C-017A',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Lehman SP135 Manual (ManualsLib)', url: 'https://www.manualslib.com/products/Lehman-Sp135-3591211.html' },
      { label: 'Lehman SP90 Owner Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/821310/Lehman-Sp90.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Injector pump wear',
      'Raw water impeller failure',
      'Heat exchanger fouling',
      'Fuel lift pump failure',
      'Governor hunting',
    ]
  },

  'lehman 135': {
    name: 'Lehman Ford 135 / SP135',
    type: 'diesel', cylinders: 6, displacement: '3.54L',
    horsepower: '135hp', rpm: '2800',
    oilCapacity: '8.0L', oilSpec: 'SAE 30 CD or Ford M2C-017A',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Lehman SP135 Owner Manual (ManualsLib)', url: 'https://www.manualslib.com/products/Lehman-Sp135-3591211.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Injector pump wear',
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Fuel lift pump diaphragm failure',
      'Thermostat failure',
    ]
  },

  'lehman 150': {
    name: 'Lehman Ford 150 / SP150',
    type: 'diesel', cylinders: 6, displacement: '3.54L',
    horsepower: '150hp', rpm: '3000',
    oilCapacity: '8.0L', oilSpec: 'SAE 30 CD or Ford M2C-017A',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Lehman SP275 Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Lehman-Sp275-3591215.html' },
      { label: 'Lehman SP135 Owner Manual (ManualsLib)', url: 'https://www.manualslib.com/products/Lehman-Sp135-3591211.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Injector pump wear',
      'Heat exchanger fouling',
      'Raw water impeller failure',
      'Fuel filter clogging',
      'Turbocharger issues (turbocharged variant)',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DETROIT DIESEL (2-STROKE)
  // ═══════════════════════════════════════════════════════════════════════════

  'detroit diesel 2-71': {
    name: 'Detroit Diesel 2-71',
    type: 'diesel', cylinders: 2, displacement: '2.32L',
    horsepower: '60-90hp', rpm: '2100',
    oilCapacity: '5.7L', oilSpec: 'SAE 30 DD Series 3 (MIL-L-2104)',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Detroit Diesel Inline 71 Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/4069595/Detroit-Diesel-Inline-71.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Blower (supercharger) failure or worn seals',
      'Injector unit failure (unit injectors)',
      'Cylinder liner pitting',
      'Governor hunting',
      'Raw water pump impeller failure',
    ]
  },

  'detroit diesel 3-71': {
    name: 'Detroit Diesel 3-71',
    type: 'diesel', cylinders: 3, displacement: '3.48L',
    horsepower: '90-130hp', rpm: '2100',
    oilCapacity: '8.5L', oilSpec: 'SAE 30 DD Series 3 (MIL-L-2104)',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Detroit Diesel Inline 71 Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/4069595/Detroit-Diesel-Inline-71.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Blower seal wear causing smoke',
      'Unit injector failure',
      'Cylinder liner cavitation pitting',
      'Crankshaft main bearing wear',
      'Raw water pump impeller failure',
    ]
  },

  'detroit diesel 4-71': {
    name: 'Detroit Diesel 4-71',
    type: 'diesel', cylinders: 4, displacement: '4.64L',
    horsepower: '130-180hp', rpm: '2100',
    oilCapacity: '11.5L', oilSpec: 'SAE 30 DD Series 3 (MIL-L-2104)',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Detroit Diesel Inline 71 Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/4069595/Detroit-Diesel-Inline-71.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Blower seal wear',
      'Unit injector failure',
      'Cylinder liner pitting',
      'Governor hunting',
      'Excessive smoke from worn rings',
    ]
  },

  'detroit diesel 6-71': {
    name: 'Detroit Diesel 6-71 / 6-71T',
    type: 'diesel', cylinders: 6, displacement: '6.96L',
    horsepower: '175-265hp', rpm: '2100',
    oilCapacity: '15.0L', oilSpec: 'SAE 30 DD Series 3 (MIL-L-2104)',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Detroit Diesel Inline 71 Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/4069595/Detroit-Diesel-Inline-71.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Blower seal wear/failure',
      'Unit injector calibration drift',
      'Cylinder liner pitting/cavitation',
      'Turbocharger failure on 6-71T',
      'Governor hunting/erratic idle',
      'Raw water pump impeller failure',
    ]
  },

  'detroit diesel 8v-71': {
    name: 'Detroit Diesel 8V-71 / 8V-71T / 8V-71TI',
    type: 'diesel', cylinders: 8, displacement: '9.28L',
    horsepower: '250-435hp', rpm: '2100',
    oilCapacity: '19.0L', oilSpec: 'SAE 30 DD Series 3 (MIL-L-2104)',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '100hrs',
    transmissionOilInterval: '200hrs',
    manuals: [
      { label: 'Detroit Diesel V-71 Series Operator Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1228180/Detroit-Diesel-V-71-Series.html' },
      { label: 'Detroit Diesel V-71 Operator Manual alt (ManualsLib)', url: 'https://www.manualslib.com/manual/1287909/Detroit-Diesel-V-71.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Blower seal failure (blue smoke at startup)',
      'Unit injector failure',
      'Turbocharger failure (8V-71T/TI)',
      'Cylinder liner cavitation erosion',
      'Governor instability',
      'Raw water pump impeller failure',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CUMMINS MARINE
  // ═══════════════════════════════════════════════════════════════════════════

  'cummins 4b': {
    name: 'Cummins 4B / 4BTA Marine',
    type: 'diesel', cylinders: 4, displacement: '3.9L',
    horsepower: '75-150hp', rpm: '2500',
    oilCapacity: '9.5L', oilSpec: 'SAE 15W-40 CJ-4',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    torqueSpecs: { headBolt: '149 Nm (110 ft-lb)', mainBearing: '156 Nm (115 ft-lb)', rodBearing: '88 Nm (65 ft-lb)' },
    parts: { oilFilterPartNum: '3931063', fuelFilterPartNum: '3903224' },
    manuals: [
      { label: 'Cummins ISB Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1454581/Cummins-Isb.html' },
      { label: 'Cummins Marine Support', url: 'https://marine.cummins.com/support' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Heat exchanger fouling',
      'Injector return line failure',
      'Aftercooler corrosion (saltwater)',
      'Fuel filter clogging from algae',
    ]
  },

  'cummins 6b': {
    name: 'Cummins 6B / 6BTA Marine',
    type: 'diesel', cylinders: 6, displacement: '5.9L',
    horsepower: '130-280hp', rpm: '2600',
    oilCapacity: '13.3L', oilSpec: 'SAE 15W-40 CJ-4',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    torqueSpecs: { headBolt: '149 Nm (110 ft-lb)', mainBearing: '156 Nm (115 ft-lb)', rodBearing: '88 Nm (65 ft-lb)' },
    parts: { oilFilterPartNum: '3931063', fuelFilterPartNum: '3903224' },
    manuals: [
      { label: 'Cummins ISB Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1454581/Cummins-Isb.html' },
      { label: 'Cummins ISB Quick Reference Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1506292/Cummins-Isb-Series.html' },
      { label: 'Cummins Marine Support', url: 'https://marine.cummins.com/support' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Aftercooler corrosion',
      'Injector o-ring failure causing fuel dilution',
      'Turbocharger failure',
      'Heat exchanger scaling',
    ]
  },

  'cummins qsb 5.9': {
    name: 'Cummins QSB 5.9 Marine',
    type: 'diesel', cylinders: 6, displacement: '5.9L',
    horsepower: '230-480hp', rpm: '3000',
    oilCapacity: '13.3L', oilSpec: 'SAE 15W-40 CJ-4',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    torqueSpecs: { headBolt: '149 Nm (110 ft-lb)', mainBearing: '175 Nm (129 ft-lb)', rodBearing: '88 Nm (65 ft-lb)' },
    parts: { oilFilterPartNum: '3931063', fuelFilterPartNum: '4003948' },
    manuals: [
      { label: 'Cummins ISB/QSB Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1454581/Cummins-Isb.html' },
      { label: 'Cummins ISB Engine Manuals (ManualsLib)', url: 'https://www.manualslib.com/c/cummins+engine.html' },
      { label: 'Cummins Marine Support', url: 'https://marine.cummins.com/support' },
    ],
    commonIssues: [
      'ECM/electronic faults from moisture ingress',
      'Raw water pump impeller failure',
      'Aftercooler corrosion in saltwater applications',
      'Injector failure on high-hour engines',
      'Turbocharger compressor wheel damage',
      'Heat exchanger scaling',
    ]
  },

  'cummins qsm 11': {
    name: 'Cummins QSM 11 Marine',
    type: 'diesel', cylinders: 6, displacement: '11.0L',
    horsepower: '480-715hp', rpm: '2800',
    oilCapacity: '26.5L', oilSpec: 'SAE 15W-40 CJ-4',
    coolantType: 'Freshwater cooled with keel cooler or heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    manuals: [
      { label: 'Cummins Engine Manuals (ManualsLib)', url: 'https://www.manualslib.com/c/cummins+engine.html' },
      { label: 'Cummins Marine Support', url: 'https://marine.cummins.com/support' },
    ],
    commonIssues: [
      'Turbocharger failure',
      'Raw water pump impeller failure',
      'Injector wear on high-hour engines',
      'EGR valve fouling',
      'Heat exchanger scaling',
      'Aftercooler corrosion',
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATERPILLAR MARINE
  // ═══════════════════════════════════════════════════════════════════════════

  'caterpillar 3208': {
    name: 'Caterpillar 3208 Marine',
    type: 'diesel', cylinders: 8, displacement: '10.4L',
    horsepower: '210-435hp', rpm: '2800',
    oilCapacity: '18.9L', oilSpec: 'SAE 15W-40 CAT DEO',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    manuals: [
      { label: 'Caterpillar Marine Products', url: 'https://www.cat.com/en_US/products/new/power-systems/marine-power.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'Raw water pump impeller failure',
      'Injector failure (common on high-hour engines)',
      'Turbocharger failure',
      'Heat exchanger scaling',
      'Crankshaft seal leaks on high-hour engines',
    ]
  },

  'caterpillar 3116': {
    name: 'Caterpillar 3116 Marine',
    type: 'diesel', cylinders: 6, displacement: '6.6L',
    horsepower: '205-350hp', rpm: '2800',
    oilCapacity: '15.1L', oilSpec: 'SAE 15W-40 CAT DEO',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    manuals: [
      { label: 'Caterpillar Marine Products', url: 'https://www.cat.com/en_US/products/new/power-systems/marine-power.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'HEUI injector failure (high-pressure oil system)',
      'Raw water pump impeller failure',
      'High-pressure oil pump failure',
      'Turbocharger failure',
      'Heat exchanger scaling',
      'ICP sensor failure causing no-start',
    ]
  },

  'caterpillar 3126': {
    name: 'Caterpillar 3126 Marine',
    type: 'diesel', cylinders: 6, displacement: '7.2L',
    horsepower: '250-420hp', rpm: '2800',
    oilCapacity: '17.0L', oilSpec: 'SAE 15W-40 CAT DEO',
    coolantType: 'Freshwater cooled with heat exchanger',
    impellerInterval: 'Annually',
    oilChangeInterval: '250hrs',
    transmissionOilInterval: '500hrs',
    manuals: [
      { label: 'Caterpillar Marine Products', url: 'https://www.cat.com/en_US/products/new/power-systems/marine-power.html' },
      { label: 'Marine Diesel Manuals', url: 'https://marine-diesel-engine-manuals.com' },
    ],
    commonIssues: [
      'HEUI injector failure',
      'High-pressure oil pump failure',
      'ICP/IPR sensor failure',
      'Raw water pump impeller failure',
      'Turbocharger failure',
      'Heat exchanger fouling/corrosion',
    ]
  },

};

// ═══════════════════════════════════════════════════════════════════════════
// FIND ENGINE — fuzzy match with brand awareness
// ═══════════════════════════════════════════════════════════════════════════

function findEngine(query) {
  if (!query) return null;
  const q = query.toLowerCase().replace(/[^a-z0-9.\s-]/g, '').trim();

  // 1. Direct key match
  for (const key of Object.keys(ENGINE_DB)) {
    if (q.includes(key)) return { key, ...ENGINE_DB[key] };
  }

  // 2. Fuzzy match on engine name
  for (const [key, engine] of Object.entries(ENGINE_DB)) {
    if (q.includes(engine.name.toLowerCase())) return { key, ...ENGINE_DB[key] };
  }

  // 3. Brand + model partial match
  // YANMAR
  if (q.includes('yanmar')) {
    if (q.match(/6ly/)) return { key: 'yanmar 6ly', ...ENGINE_DB['yanmar 6ly'] };
    if (q.match(/4jh/)) return { key: 'yanmar 4jh', ...ENGINE_DB['yanmar 4jh'] };
    if (q.match(/3hm/)) return { key: 'yanmar 3hm', ...ENGINE_DB['yanmar 3hm'] };
    if (q.match(/3gm/)) return { key: 'yanmar 3gm', ...ENGINE_DB['yanmar 3gm'] };
    if (q.match(/2gm/)) return { key: 'yanmar 2gm', ...ENGINE_DB['yanmar 2gm'] };
    if (q.match(/1gm/)) return { key: 'yanmar 1gm', ...ENGINE_DB['yanmar 1gm'] };
  }

  // VOLVO PENTA
  if (q.includes('volvo') || q.includes('penta')) {
    if (q.match(/\bd6\b/)) return { key: 'volvo penta d6', ...ENGINE_DB['volvo penta d6'] };
    if (q.match(/\bd4\b/)) return { key: 'volvo penta d4', ...ENGINE_DB['volvo penta d4'] };
    if (q.match(/\bd3\b/)) return { key: 'volvo penta d3', ...ENGINE_DB['volvo penta d3'] };
    if (q.match(/\bd2\b|d2-/)) return { key: 'volvo penta d2', ...ENGINE_DB['volvo penta d2'] };
    if (q.match(/\bd1\b|d1-/)) return { key: 'volvo penta d1', ...ENGINE_DB['volvo penta d1'] };
    if (q.match(/md22/)) return { key: 'volvo penta md22', ...ENGINE_DB['volvo penta md22'] };
    if (q.match(/md21/)) return { key: 'volvo penta md21', ...ENGINE_DB['volvo penta md21'] };
    if (q.match(/md17/)) return { key: 'volvo penta md11', ...ENGINE_DB['volvo penta md11'] };
    if (q.match(/md11/)) return { key: 'volvo penta md11', ...ENGINE_DB['volvo penta md11'] };
    if (q.match(/md7/)) return { key: 'volvo penta md7', ...ENGINE_DB['volvo penta md7'] };
    if (q.match(/md2/)) return { key: 'volvo penta md2', ...ENGINE_DB['volvo penta md2'] };
    if (q.match(/200[123]/)) return { key: 'volvo penta 2002', ...ENGINE_DB['volvo penta 2002'] };
  }

  // UNIVERSAL
  if (q.includes('universal') || q.includes('atomic')) {
    if (q.match(/m.?50|\b50\b/)) return { key: 'universal m50', ...ENGINE_DB['universal m50'] };
    if (q.match(/m.?40|\b40\b/)) return { key: 'universal m40', ...ENGINE_DB['universal m40'] };
    if (q.match(/m.?35|\b35\b/)) return { key: 'universal m35', ...ENGINE_DB['universal m35'] };
    if (q.match(/m.?25|\b25\b/)) return { key: 'universal m25', ...ENGINE_DB['universal m25'] };
    if (q.match(/m.?18|atomic|\b18\b/)) return { key: 'universal m18', ...ENGINE_DB['universal m18'] };
    if (q.match(/m.?12|\b12\b/)) return { key: 'universal m12', ...ENGINE_DB['universal m12'] };
  }

  // WESTERBEKE
  if (q.includes('westerbeke') || q.includes('westerb')) {
    if (q.match(/4.?154/)) return { key: 'westerbeke 4-154', ...ENGINE_DB['westerbeke 4-154'] };
    if (q.match(/4.?108/)) return { key: 'westerbeke 4-108', ...ENGINE_DB['westerbeke 4-108'] };
    if (q.match(/4.?107/)) return { key: 'westerbeke 4-107', ...ENGINE_DB['westerbeke 4-107'] };
    if (q.match(/w50|\b50\b/)) return { key: 'westerbeke w50', ...ENGINE_DB['westerbeke w50'] };
    if (q.match(/w40|\b40\b/)) return { key: 'westerbeke w40', ...ENGINE_DB['westerbeke w40'] };
    if (q.match(/w30|\b30\b/)) return { key: 'westerbeke w30', ...ENGINE_DB['westerbeke w30'] };
    if (q.match(/w21|20b|\b21\b/)) return { key: 'westerbeke w21', ...ENGINE_DB['westerbeke w21'] };
    if (q.match(/w13|12b|\b13\b/)) return { key: 'westerbeke w13', ...ENGINE_DB['westerbeke w13'] };
    return { key: 'westerbeke w30', ...ENGINE_DB['westerbeke w30'] };
  }

  // PERKINS
  if (q.includes('perkins')) {
    if (q.match(/6.?354/)) return { key: 'perkins 6.354', ...ENGINE_DB['perkins 6.354'] };
    if (q.match(/4.?154/)) return { key: 'perkins 4.154', ...ENGINE_DB['perkins 4.154'] };
    if (q.match(/4.?108/)) return { key: 'perkins 4.108', ...ENGINE_DB['perkins 4.108'] };
    if (q.match(/4.?107/)) return { key: 'perkins 4.107', ...ENGINE_DB['perkins 4.107'] };
    return { key: 'perkins 4.108', ...ENGINE_DB['perkins 4.108'] };
  }

  // MERCRUISER / MERCURY
  if (q.includes('mercruiser') || q.includes('mercrusier') || q.includes('mercury')) {
    if (q.match(/bravo/)) return { key: 'mercruiser bravo', ...ENGINE_DB['mercruiser bravo'] };
    if (q.match(/alpha/)) return { key: 'mercruiser alpha one', ...ENGINE_DB['mercruiser alpha one'] };
    if (q.match(/7\.4|454|502/)) return { key: 'mercruiser 7.4', ...ENGINE_DB['mercruiser 7.4'] };
    if (q.match(/5\.7|350/)) return { key: 'mercruiser 5.7', ...ENGINE_DB['mercruiser 5.7'] };
    if (q.match(/5\.0/)) return { key: 'mercruiser 5.0', ...ENGINE_DB['mercruiser 5.0'] };
    if (q.match(/4\.3/)) return { key: 'mercruiser 4.3', ...ENGINE_DB['mercruiser 4.3'] };
    if (q.match(/3\.0/)) return { key: 'mercruiser 3.0', ...ENGINE_DB['mercruiser 3.0'] };
    return { key: 'mercruiser 5.7', ...ENGINE_DB['mercruiser 5.7'] };
  }

  // CRUSADER
  if (q.includes('crusader')) {
    if (q.match(/454|7\.4/)) return { key: 'crusader 454', ...ENGINE_DB['crusader 454'] };
    if (q.match(/350|5\.7/)) return { key: 'crusader 350', ...ENGINE_DB['crusader 350'] };
    if (q.match(/302|5\.0/)) return { key: 'crusader 302', ...ENGINE_DB['crusader 302'] };
    if (q.match(/270/)) return { key: 'crusader 270', ...ENGINE_DB['crusader 270'] };
    return { key: 'crusader 350', ...ENGINE_DB['crusader 350'] };
  }

  // LEHMAN
  if (q.includes('lehman') || q.includes('ford marine diesel')) {
    if (q.match(/150|sp150/)) return { key: 'lehman 150', ...ENGINE_DB['lehman 150'] };
    if (q.match(/135|sp135/)) return { key: 'lehman 135', ...ENGINE_DB['lehman 135'] };
    if (q.match(/120|sp120/)) return { key: 'lehman 120', ...ENGINE_DB['lehman 120'] };
    return { key: 'lehman 135', ...ENGINE_DB['lehman 135'] };
  }

  // DETROIT DIESEL
  if (q.includes('detroit') || q.match(/\b(2|3|4|6)-71\b|\b8v.?71\b/)) {
    if (q.match(/8v.?71/)) return { key: 'detroit diesel 8v-71', ...ENGINE_DB['detroit diesel 8v-71'] };
    if (q.match(/6-?71/)) return { key: 'detroit diesel 6-71', ...ENGINE_DB['detroit diesel 6-71'] };
    if (q.match(/4-?71/)) return { key: 'detroit diesel 4-71', ...ENGINE_DB['detroit diesel 4-71'] };
    if (q.match(/3-?71/)) return { key: 'detroit diesel 3-71', ...ENGINE_DB['detroit diesel 3-71'] };
    if (q.match(/2-?71/)) return { key: 'detroit diesel 2-71', ...ENGINE_DB['detroit diesel 2-71'] };
    return { key: 'detroit diesel 6-71', ...ENGINE_DB['detroit diesel 6-71'] };
  }

  // CUMMINS
  if (q.includes('cummins')) {
    if (q.match(/qsm.?11/)) return { key: 'cummins qsm 11', ...ENGINE_DB['cummins qsm 11'] };
    if (q.match(/qsb.?5\.9|qsb/)) return { key: 'cummins qsb 5.9', ...ENGINE_DB['cummins qsb 5.9'] };
    if (q.match(/6bta|6b\b/)) return { key: 'cummins 6b', ...ENGINE_DB['cummins 6b'] };
    if (q.match(/4bta|4b\b/)) return { key: 'cummins 4b', ...ENGINE_DB['cummins 4b'] };
    return { key: 'cummins qsb 5.9', ...ENGINE_DB['cummins qsb 5.9'] };
  }

  // CATERPILLAR
  if (q.includes('caterpillar') || q.includes('cat ') || q.match(/\b3(116|126|208)\b/)) {
    if (q.match(/3208/)) return { key: 'caterpillar 3208', ...ENGINE_DB['caterpillar 3208'] };
    if (q.match(/3126/)) return { key: 'caterpillar 3126', ...ENGINE_DB['caterpillar 3126'] };
    if (q.match(/3116/)) return { key: 'caterpillar 3116', ...ENGINE_DB['caterpillar 3116'] };
    return { key: 'caterpillar 3208', ...ENGINE_DB['caterpillar 3208'] };
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// OUTBOARD ENGINES
// ═══════════════════════════════════════════════════════════════════════════

Object.assign(ENGINE_DB, {

  // ─── YAMAHA OUTBOARDS ───────────────────────────────────────────────────
  'yamaha f2.5': {
    name: 'Yamaha F2.5 / F4 / F6 Outboard', type: 'gasoline outboard', cylinders: 1, displacement: '72–123cc',
    horsepower: '2.5–6hp', rpm: '5500',
    oilCapacity: '0.35–0.6L', oilSpec: '10W-30 FC-W',
    coolantType: 'Raw water (open cooling)', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F2.5–F6 Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/yamaha/outboard-motor.html' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['Carburetor clogging', 'Water pump impeller failure', 'Fuel primer bulb cracking', 'Spark plug fouling', 'Lower unit gear oil contamination']
  },

  'yamaha f9.9': {
    name: 'Yamaha F9.9 / F15 / F20 Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '212–323cc',
    horsepower: '9.9–20hp', rpm: '5500',
    oilCapacity: '0.65L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F9.9/F15 Manual (ManualsLib)', url: 'https://www.manualslib.com/brand/yamaha/outboard-motor.html' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['Water pump failure', 'Carburetor jets clogging', 'Thermostat failure', 'Gear oil leaks', 'Spark plug fouling']
  },

  'yamaha f25': {
    name: 'Yamaha F25 / T25 Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '432cc',
    horsepower: '25hp', rpm: '5500',
    oilCapacity: '1.0L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F25 Manual (ManualsLib)', url: 'https://www.manualslib.com/brand/yamaha/outboard-motor.html' },
    ],
    commonIssues: ['Impeller failure', 'VST fuel system issues', 'Thermostat', 'Trim/tilt seal leaks', 'Carb jets on older models']
  },

  'yamaha f40': {
    name: 'Yamaha F40 / F50 / F60 Outboard', type: 'gasoline outboard', cylinders: 3, displacement: '747–996cc',
    horsepower: '40–60hp', rpm: '5500–6000',
    oilCapacity: '1.8L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F40–F60 Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/yamaha/outboard-motor.html' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['Water pump impeller', 'VST fuel filter clogging', 'HPDI fuel system on older models', 'Thermostat', 'Lower unit seal leaks']
  },

  'yamaha f75': {
    name: 'Yamaha F75 / F90 / F100 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1596cc',
    horsepower: '75–100hp', rpm: '5500–6000',
    oilCapacity: '3.6L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F75/F90 Service Manual (ManualsLib)', url: 'https://www.manualslib.com/brand/yamaha/outboard-motor.html' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['Impeller failure', 'Fuel VST issues', 'Trim/tilt motor', 'Thermostat stuck closed', 'Anode/zinc corrosion']
  },

  'yamaha f115': {
    name: 'Yamaha F115 / LF115 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1832cc',
    horsepower: '115hp', rpm: '5000–6000',
    oilCapacity: '4.0L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F115 Service Manual (ManualsLib)', url: 'https://www.manualslib.com/brand/yamaha/outboard-motor.html' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['VST fuel filter', 'Water pump impeller', 'Idle air control valve', 'TPS sensor', 'Lower unit gear oil']
  },

  'yamaha f150': {
    name: 'Yamaha F150 / FL150 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '2670cc',
    horsepower: '150hp', rpm: '5000–6000',
    oilCapacity: '4.7L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F150 Service Manual (SlideShare)', url: 'https://www.slideshare.net/slideshow/yamaha-f150-aet-outboard-service-repair-manual-x-1000044/244829667' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['VST fuel system', 'Impeller', 'Trim/tilt', 'Shift shaft', 'IACV valve']
  },

  'yamaha f200': {
    name: 'Yamaha F200 / F225 / F250 / F300 Outboard', type: 'gasoline outboard', cylinders: 6, displacement: '3352–4169cc',
    horsepower: '200–300hp', rpm: '5000–6000',
    oilCapacity: '6.5L', oilSpec: '10W-30 FC-W 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Yamaha Outboard Owners Manuals (Official)', url: 'https://yamahaoutboards.com/owner-center/owners-manuals' },
      { label: 'Yamaha F225/F250/F300 Service Manual (Scribd)', url: 'https://es.scribd.com/document/377994747/Yamaha-outboard-engine-service-manual' },
      { label: 'Download Boat Manuals — Yamaha', url: 'https://www.downloadboatmanuals.com/motors/yamaha/' },
    ],
    commonIssues: ['VST and HPDI fuel issues', 'Impeller', 'Trim/tilt cylinders', 'Lower unit seals', 'Injector cleaning']
  },

  // ─── SUZUKI OUTBOARDS ───────────────────────────────────────────────────
  'suzuki df2.5': {
    name: 'Suzuki DF2.5 / DF4 / DF6 Outboard', type: 'gasoline outboard', cylinders: 1, displacement: '68–138cc',
    horsepower: '2.5–6hp', rpm: '5500',
    oilCapacity: '0.35L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Suzuki Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/suzuki/outboard-motor.html' },
      { label: 'Download Boat Manuals — Suzuki', url: 'https://www.downloadboatmanuals.com/motors/suzuki/' },
    ],
    commonIssues: ['Carburetor clogging', 'Water pump failure', 'Spark plug fouling', 'Gear oil contamination']
  },

  'suzuki df9.9': {
    name: 'Suzuki DF9.9 / DF15 / DF20 Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '222–323cc',
    horsepower: '9.9–20hp', rpm: '5500',
    oilCapacity: '0.65L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Suzuki Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/suzuki/outboard-motor.html' },
      { label: 'Download Boat Manuals — Suzuki', url: 'https://www.downloadboatmanuals.com/motors/suzuki/' },
    ],
    commonIssues: ['Water pump impeller', 'Carburetor issues', 'Thermostat', 'Gear case seal leaks']
  },

  'suzuki df40': {
    name: 'Suzuki DF40 / DF50 / DF60 Outboard', type: 'gasoline outboard', cylinders: 3, displacement: '747–995cc',
    horsepower: '40–60hp', rpm: '5500–6000',
    oilCapacity: '1.8L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Suzuki Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/suzuki/outboard-motor.html' },
      { label: 'Download Boat Manuals — Suzuki', url: 'https://www.downloadboatmanuals.com/motors/suzuki/' },
    ],
    commonIssues: ['Impeller', 'Fuel pump', 'Thermostat', 'Lower unit seals', 'Trim motor']
  },

  'suzuki df90': {
    name: 'Suzuki DF90 / DF100 / DF115 / DF140 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1502–1985cc',
    horsepower: '90–140hp', rpm: '5500–6000',
    oilCapacity: '3.5L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Suzuki DF90 Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/837067/Suzuki-Df-90.html' },
      { label: 'Suzuki DF115 Manuals (ManualsLib)', url: 'https://www.manualslib.com/products/Suzuki-Df-115-9984307.html' },
      { label: 'Download Boat Manuals — Suzuki', url: 'https://www.downloadboatmanuals.com/motors/suzuki/' },
    ],
    commonIssues: ['Impeller failure', 'IAC valve', 'Trim/tilt seal leaks', 'Fuel injector', 'Thermostat']
  },

  'suzuki df150': {
    name: 'Suzuki DF150 / DF175 / DF200 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '2867cc',
    horsepower: '150–200hp', rpm: '5500–6300',
    oilCapacity: '4.5L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Suzuki DF150 Service Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1241779/Suzuki-Df150.html' },
      { label: 'Suzuki DF150 Owners Manual (ManualsLib)', url: 'https://www.manualslib.com/manual/1472702/Suzuki-Df150.html' },
      { label: 'Download Boat Manuals — Suzuki', url: 'https://www.downloadboatmanuals.com/motors/suzuki/' },
    ],
    commonIssues: ['Impeller', 'Fuel injectors', 'Trim/tilt', 'Lower unit seals', 'Throttle position sensor']
  },

  'suzuki df250': {
    name: 'Suzuki DF250 / DF300 Outboard', type: 'gasoline outboard', cylinders: 6, displacement: '3614cc',
    horsepower: '250–300hp', rpm: '5500–6300',
    oilCapacity: '6.0L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Suzuki Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/suzuki/outboard-motor.html' },
      { label: 'Download Boat Manuals — Suzuki', url: 'https://www.downloadboatmanuals.com/motors/suzuki/' },
    ],
    commonIssues: ['Impeller', 'VST/fuel rail pressure', 'Trim/tilt cylinder seals', 'Anode replacement', 'Lower unit gear lube']
  },

  // ─── HONDA OUTBOARDS ────────────────────────────────────────────────────
  'honda bf2.3': {
    name: 'Honda BF2.3 / BF5 / BF8 / BF10 Outboard', type: 'gasoline outboard', cylinders: 1, displacement: '57–169cc',
    horsepower: '2.3–10hp', rpm: '5000–6000',
    oilCapacity: '0.35–0.6L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
      { label: 'Honda Marine Service Manuals (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
    ],
    commonIssues: ['Carburetor gumming', 'Water pump failure', 'Spark plug', 'Gear oil contamination']
  },

  'honda bf15': {
    name: 'Honda BF15 / BF20 / BF25 Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '351–498cc',
    horsepower: '15–25hp', rpm: '5500–6000',
    oilCapacity: '0.9L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
      { label: 'Honda Marine Service Manuals (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
    ],
    commonIssues: ['Impeller', 'Carburetor', 'Thermostat', 'Gear case seal']
  },

  'honda bf40': {
    name: 'Honda BF40 / BF50 / BF60 Outboard', type: 'gasoline outboard', cylinders: 3, displacement: '808–1496cc',
    horsepower: '40–60hp', rpm: '5500–6000',
    oilCapacity: '1.8L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
      { label: 'Honda Marine Service Manuals (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
    ],
    commonIssues: ['Impeller', 'Fuel pump', 'Idle speed screw', 'Trim/tilt', 'Lower unit']
  },

  'honda bf75': {
    name: 'Honda BF75 / BF90 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1496cc',
    horsepower: '75–90hp', rpm: '5500–6000',
    oilCapacity: '2.6L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda BF75A/BF90A Service Manual (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
    ],
    commonIssues: ['Impeller', 'VST fuel system', 'Thermostat', 'Idle air control', 'Trim/tilt seal']
  },

  'honda bf115': {
    name: 'Honda BF115 / BF130 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1832cc',
    horsepower: '115–130hp', rpm: '5000–6000',
    oilCapacity: '3.8L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda BF115A/BF130A Service Manual (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
    ],
    commonIssues: ['Impeller', 'Fuel VST', 'IACV', 'TPS sensor', 'Lower unit seal']
  },

  'honda bf150': {
    name: 'Honda BF135 / BF150 Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '2354cc',
    horsepower: '135–150hp', rpm: '5000–6000',
    oilCapacity: '4.2L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda BF135A/BF150A Service Manual (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
    ],
    commonIssues: ['Impeller', 'Fuel VST/injectors', 'Trim/tilt', 'Lower unit', 'Throttle body']
  },

  'honda bf200': {
    name: 'Honda BF175 / BF200 / BF225 Outboard', type: 'gasoline outboard', cylinders: 6, displacement: '3471cc',
    horsepower: '175–225hp', rpm: '5000–6000',
    oilCapacity: '6.1L', oilSpec: '10W-30 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Honda Marine Owners Manuals (Official — Free)', url: 'https://marine.honda.com/support/manuals' },
      { label: 'Honda BF175A/BF200A/BF225A Service Manual (Manuals-Free.com)', url: 'https://manuals-free.com/brand/honda-marine/' },
      { label: 'Honda Outboard Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/honda/' },
    ],
    commonIssues: ['Impeller', 'Injectors', 'Trim/tilt cylinders', 'Lower unit gear lube', 'Anode replacement']
  },

  // ─── EVINRUDE / JOHNSON OUTBOARDS ──────────────────────────────────────
  'evinrude 9.9': {
    name: 'Evinrude / Johnson 9.9–15hp Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '216–305cc',
    horsepower: '9.9–15hp', rpm: '5000–5500',
    oilCapacity: 'Injection (2-stroke oil tank)', oilSpec: 'BRP Evinrude XD100 2-stroke oil',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: 'N/A (2-stroke, oil injection)',
    manuals: [
      { label: 'Johnson/Evinrude Service Manuals (Official)', url: 'https://johnson.marineservicemanuals.com/' },
      { label: 'Evinrude Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/evinrude/' },
      { label: 'Classic Evinrude/Johnson Free Manuals (iBoats Forum)', url: 'https://forums.iboats.com/threads/classic-johnson-evinrude-service-manuals-wire-diagrams-and-more-free.534851/' },
    ],
    commonIssues: ['Water pump impeller', 'Carburetor', 'Power pack/CDI', 'Oil injection pump failure', 'Fuel primer system']
  },

  'evinrude 40': {
    name: 'Evinrude / Johnson 25–60hp Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '431–914cc',
    horsepower: '25–60hp', rpm: '5000–5500',
    oilCapacity: 'Injection (2-stroke oil tank)', oilSpec: 'BRP Evinrude XD100 2-stroke oil',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: 'N/A (2-stroke, oil injection)',
    manuals: [
      { label: 'Johnson/Evinrude Service Manuals (Official)', url: 'https://johnson.marineservicemanuals.com/' },
      { label: 'Evinrude Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/evinrude/' },
    ],
    commonIssues: ['Water pump', 'Power pack/CDI', 'Stator failure', 'VRO oil pump', 'Lower unit seals']
  },

  'evinrude 90': {
    name: 'Evinrude E-TEC / Johnson 75–115hp Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '1298cc',
    horsepower: '75–115hp', rpm: '5500–6000',
    oilCapacity: 'Injection (2-stroke oil tank)', oilSpec: 'BRP Evinrude XD100 2-stroke oil',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: 'N/A (2-stroke, oil injection)',
    manuals: [
      { label: 'Johnson/Evinrude Service Manuals (Official)', url: 'https://johnson.marineservicemanuals.com/' },
      { label: 'Evinrude E-TEC Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/evinrude/' },
    ],
    commonIssues: ['E-TEC EMM module', 'Water pump', 'Injector cleaning', 'Oil injection pump', 'Power head carbon buildup']
  },

  'evinrude 150': {
    name: 'Evinrude E-TEC 115–200hp Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1726–2597cc',
    horsepower: '115–200hp', rpm: '5500–6000',
    oilCapacity: 'Injection (2-stroke oil tank)', oilSpec: 'BRP Evinrude XD100 2-stroke oil',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: 'N/A (2-stroke, oil injection)',
    manuals: [
      { label: 'Johnson/Evinrude Service Manuals (Official)', url: 'https://johnson.marineservicemanuals.com/' },
      { label: 'Evinrude E-TEC Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/evinrude/' },
      { label: 'Johnson Evinrude 1990–2001 Manual (Scribd)', url: 'https://de.scribd.com/document/325468088/johnson-evinrude-1990-2001-service-manual-pdf' },
    ],
    commonIssues: ['EMM/ECU module', 'Water pump', 'Fuel injectors', 'Stator/charging', 'Lower unit']
  },

  'evinrude 250': {
    name: 'Evinrude E-TEC G2 225–300hp Outboard', type: 'gasoline outboard', cylinders: 6, displacement: '3343cc',
    horsepower: '225–300hp', rpm: '5500–6000',
    oilCapacity: 'Injection (2-stroke oil tank)', oilSpec: 'BRP Evinrude XD100 2-stroke oil',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: 'N/A (2-stroke, oil injection)',
    manuals: [
      { label: 'Johnson/Evinrude Service Manuals (Official)', url: 'https://johnson.marineservicemanuals.com/' },
      { label: 'Evinrude E-TEC Manuals (Download Boat Manuals)', url: 'https://www.downloadboatmanuals.com/motors/evinrude/' },
    ],
    commonIssues: ['EMM module programming', 'Fuel rail pressure', 'Impeller', 'Injector maintenance', 'Lower unit seals']
  },

  // ─── MERCURY / MARINER 2-STROKE OUTBOARDS ──────────────────────────────
  'mercury 2stroke 9.9': {
    name: 'Mercury / Mariner 2-Stroke 9.9–15hp Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '216cc',
    horsepower: '9.9–15hp', rpm: '5000–5500',
    oilCapacity: 'Pre-mix or injection', oilSpec: 'Mercury 2-Stroke Premium or TC-W3',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: 'N/A (2-stroke)',
    manuals: [
      { label: 'Mercury Marine Service Manuals (Official)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
      { label: 'Mercury Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/mercury/outboard-motor.html' },
      { label: 'Download Boat Manuals — Mercury', url: 'https://www.downloadboatmanuals.com/motors/mercury/' },
    ],
    commonIssues: ['Carburetor', 'Water pump', 'Ignition coil', 'CDI/power pack', 'Lower unit seals']
  },

  'mercury 4stroke 60': {
    name: 'Mercury / Mariner 4-Stroke 40–60hp Outboard', type: 'gasoline outboard', cylinders: 3, displacement: '747–999cc',
    horsepower: '40–60hp', rpm: '5500–6000',
    oilCapacity: '1.8L', oilSpec: '25W-40 4-stroke Marine',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Mercury Marine Service Manuals (Official)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
      { label: 'Mercury Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/mercury/outboard-motor.html' },
      { label: 'Download Boat Manuals — Mercury', url: 'https://www.downloadboatmanuals.com/motors/mercury/' },
    ],
    commonIssues: ['Impeller', 'EFI throttle body', 'Fuel pump', 'Trim/tilt', 'Lower unit']
  },

  'mercury 4stroke 115': {
    name: 'Mercury / Mariner 4-Stroke 75–115hp Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '1596–1832cc',
    horsepower: '75–115hp', rpm: '5000–6000',
    oilCapacity: '3.5L', oilSpec: '25W-40 4-stroke Marine',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Mercury Marine Service Manuals (Official)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
      { label: 'Mercury Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/mercury/outboard-motor.html' },
      { label: 'Download Boat Manuals — Mercury', url: 'https://www.downloadboatmanuals.com/motors/mercury/' },
    ],
    commonIssues: ['Impeller', 'VST filter', 'Fuel rail', 'Trim/tilt motor', 'Idle issues']
  },

  'mercury 4stroke 150': {
    name: 'Mercury / Mariner 4-Stroke 135–200hp Outboard', type: 'gasoline outboard', cylinders: 4, displacement: '2670–3000cc',
    horsepower: '135–200hp', rpm: '5000–6000',
    oilCapacity: '4.7L', oilSpec: '25W-40 4-stroke Marine',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Mercury Marine Service Manuals (Official)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
      { label: 'Mercury Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/mercury/outboard-motor.html' },
      { label: 'Download Boat Manuals — Mercury', url: 'https://www.downloadboatmanuals.com/motors/mercury/' },
    ],
    commonIssues: ['VST fuel system', 'Impeller', 'Shift actuator', 'Power steering', 'Trim/tilt seals']
  },

  'mercury verado': {
    name: 'Mercury Verado 200–400hp Supercharged Outboard', type: 'gasoline outboard', cylinders: 6, displacement: '2.6L supercharged',
    horsepower: '200–400hp', rpm: '5800–6400',
    oilCapacity: '7.6L', oilSpec: '25W-50 Synthetic 4-stroke Marine',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Mercury Marine Service Manuals (Official)', url: 'https://www.mercurymarine.com/en/us/support/resources/service-manual-lookup/' },
      { label: 'Mercury Verado Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/mercury/outboard-motor.html' },
    ],
    commonIssues: ['Supercharger service', 'Impeller', 'VST/fuel rail', 'Power steering pump', 'Intercooler flushing']
  },

  // ─── TOHATSU / NISSAN OUTBOARDS ─────────────────────────────────────────
  'tohatsu 9.9': {
    name: 'Tohatsu / Nissan 9.9–15hp Outboard', type: 'gasoline outboard', cylinders: 2, displacement: '246cc',
    horsepower: '9.9–15hp', rpm: '5000–5500',
    oilCapacity: '0.6L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Tohatsu Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/tohatsu/outboard-motor.html' },
      { label: 'Download Boat Manuals — Tohatsu', url: 'https://www.downloadboatmanuals.com/motors/tohatsu/' },
    ],
    commonIssues: ['Carburetor', 'Water pump', 'Spark plug', 'Gear oil leak', 'Starter rope']
  },

  'tohatsu 40': {
    name: 'Tohatsu / Nissan 25–60hp Outboard', type: 'gasoline outboard', cylinders: 3, displacement: '747–1004cc',
    horsepower: '25–60hp', rpm: '5500–6000',
    oilCapacity: '1.8L', oilSpec: '10W-40 4-stroke',
    coolantType: 'Raw water cooled', impellerInterval: 'Annually or 100hrs',
    oilChangeInterval: '100hrs or annually',
    manuals: [
      { label: 'Tohatsu Outboard Manuals (ManualsLib)', url: 'https://www.manualslib.com/brand/tohatsu/outboard-motor.html' },
      { label: 'Download Boat Manuals — Tohatsu', url: 'https://www.downloadboatmanuals.com/motors/tohatsu/' },
    ],
    commonIssues: ['Impeller', 'Fuel pump', 'Thermostat', 'Trim/tilt', 'Lower unit seals']
  },

});

// Extend findEngine to handle outboards
const _origFindEngine = findEngine;
function findEngineExtended(query) {
  if (!query) return null;
  const q = query.toLowerCase();

  // YAMAHA OUTBOARDS
  if (q.includes('yamaha') && (q.includes('outboard') || q.includes('f2') || q.includes('f4') || q.includes('f6') || q.includes('f9') || q.includes('f15') || q.includes('f25') || q.includes('f40') || q.includes('f50') || q.includes('f60') || q.includes('f75') || q.includes('f90') || q.includes('f100') || q.includes('f115') || q.includes('f150') || q.includes('f200') || q.includes('f225') || q.includes('f250') || q.includes('f300'))) {
    if (q.match(/f2\.5|f4\b|f6\b/)) return { key: 'yamaha f2.5', ...ENGINE_DB['yamaha f2.5'] };
    if (q.match(/f9\.9|f15\b|f20\b/)) return { key: 'yamaha f9.9', ...ENGINE_DB['yamaha f9.9'] };
    if (q.match(/f25\b/)) return { key: 'yamaha f25', ...ENGINE_DB['yamaha f25'] };
    if (q.match(/f40\b|f50\b|f60\b/)) return { key: 'yamaha f40', ...ENGINE_DB['yamaha f40'] };
    if (q.match(/f75\b|f90\b|f100\b/)) return { key: 'yamaha f75', ...ENGINE_DB['yamaha f75'] };
    if (q.match(/f115\b/)) return { key: 'yamaha f115', ...ENGINE_DB['yamaha f115'] };
    if (q.match(/f150\b/)) return { key: 'yamaha f150', ...ENGINE_DB['yamaha f150'] };
    if (q.match(/f200|f225|f250|f300/)) return { key: 'yamaha f200', ...ENGINE_DB['yamaha f200'] };
    return { key: 'yamaha f115', ...ENGINE_DB['yamaha f115'] }; // default Yamaha outboard
  }

  // SUZUKI OUTBOARDS
  if (q.includes('suzuki') && (q.includes('df') || q.includes('outboard'))) {
    if (q.match(/df2\.5|df4\b|df6\b/)) return { key: 'suzuki df2.5', ...ENGINE_DB['suzuki df2.5'] };
    if (q.match(/df9\.9|df15\b|df20\b/)) return { key: 'suzuki df9.9', ...ENGINE_DB['suzuki df9.9'] };
    if (q.match(/df40\b|df50\b|df60\b/)) return { key: 'suzuki df40', ...ENGINE_DB['suzuki df40'] };
    if (q.match(/df90\b|df100\b|df115\b|df140\b/)) return { key: 'suzuki df90', ...ENGINE_DB['suzuki df90'] };
    if (q.match(/df150\b|df175\b|df200\b/)) return { key: 'suzuki df150', ...ENGINE_DB['suzuki df150'] };
    if (q.match(/df250\b|df300\b/)) return { key: 'suzuki df250', ...ENGINE_DB['suzuki df250'] };
    return { key: 'suzuki df90', ...ENGINE_DB['suzuki df90'] };
  }

  // HONDA OUTBOARDS
  if (q.includes('honda') && (q.includes('bf') || q.includes('outboard'))) {
    if (q.match(/bf2\.3|bf5\b|bf8\b|bf10\b/)) return { key: 'honda bf2.3', ...ENGINE_DB['honda bf2.3'] };
    if (q.match(/bf15\b|bf20\b|bf25\b/)) return { key: 'honda bf15', ...ENGINE_DB['honda bf15'] };
    if (q.match(/bf40\b|bf50\b|bf60\b/)) return { key: 'honda bf40', ...ENGINE_DB['honda bf40'] };
    if (q.match(/bf75\b|bf90\b/)) return { key: 'honda bf75', ...ENGINE_DB['honda bf75'] };
    if (q.match(/bf115\b|bf130\b/)) return { key: 'honda bf115', ...ENGINE_DB['honda bf115'] };
    if (q.match(/bf135\b|bf150\b/)) return { key: 'honda bf150', ...ENGINE_DB['honda bf150'] };
    if (q.match(/bf175\b|bf200\b|bf225\b/)) return { key: 'honda bf200', ...ENGINE_DB['honda bf200'] };
    return { key: 'honda bf115', ...ENGINE_DB['honda bf115'] };
  }

  // EVINRUDE / JOHNSON
  if (q.includes('evinrude') || q.includes('johnson') || q.includes('e-tec') || q.includes('etec')) {
    if (q.match(/9\.9|15\s*hp/)) return { key: 'evinrude 9.9', ...ENGINE_DB['evinrude 9.9'] };
    if (q.match(/25|30|40|50|60/)) return { key: 'evinrude 40', ...ENGINE_DB['evinrude 40'] };
    if (q.match(/90|75|85|100|105|115/)) return { key: 'evinrude 90', ...ENGINE_DB['evinrude 90'] };
    if (q.match(/115|130|150|175|200/)) return { key: 'evinrude 150', ...ENGINE_DB['evinrude 150'] };
    if (q.match(/225|250|300/)) return { key: 'evinrude 250', ...ENGINE_DB['evinrude 250'] };
    return { key: 'evinrude 90', ...ENGINE_DB['evinrude 90'] };
  }

  // MERCURY OUTBOARDS (outboard-specific, not MerCruiser stern drive)
  if ((q.includes('mercury') || q.includes('mariner')) && (q.includes('outboard') || q.match(/\b(9\.9|15|25|40|50|60|75|90|115|150|175|200|225|250|300|verado)\s*(hp)?\b/))) {
    if (q.includes('verado')) return { key: 'mercury verado', ...ENGINE_DB['mercury verado'] };
    if (q.match(/\b(115|75|90|100)\s*(hp)?\b/)) return { key: 'mercury 4stroke 115', ...ENGINE_DB['mercury 4stroke 115'] };
    if (q.match(/\b(135|150|175|200)\s*(hp)?\b/)) return { key: 'mercury 4stroke 150', ...ENGINE_DB['mercury 4stroke 150'] };
    if (q.match(/\b(40|50|60)\s*(hp)?\b/)) return { key: 'mercury 4stroke 60', ...ENGINE_DB['mercury 4stroke 60'] };
    if (q.match(/2.?stroke|2-?cycle/)) return { key: 'mercury 2stroke 9.9', ...ENGINE_DB['mercury 2stroke 9.9'] };
    return { key: 'mercury 4stroke 115', ...ENGINE_DB['mercury 4stroke 115'] };
  }

  // TOHATSU / NISSAN
  if (q.includes('tohatsu') || q.includes('nissan') && q.includes('outboard')) {
    if (q.match(/9\.9|15/)) return { key: 'tohatsu 9.9', ...ENGINE_DB['tohatsu 9.9'] };
    return { key: 'tohatsu 40', ...ENGINE_DB['tohatsu 40'] };
  }

  // Fall back to original inboard findEngine
  return _origFindEngine(query);
}

// Override the exported function
Object.defineProperty(module.exports, 'findEngine', { value: findEngineExtended, writable: true });

module.exports = { ENGINE_DB, findEngine: findEngineExtended };
