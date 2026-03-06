// Service detail content for lawn care and pest control pages.
// Keyed by slug for lookup from dynamic route params.

export type ServiceContent = {
  headline: string;
  intro: string;
  details: string[];
  benefits: string[];
  seasonalNote?: string;
  faq: { q: string; a: string }[];
};

export const LAWN_SERVICE_CONTENT: Record<string, ServiceContent> = {
  fertilization: {
    headline: "Professional Lawn Fertilization",
    intro:
      "Our custom-blended fertilizer programs are designed specifically for Oklahoma's alkaline clay soils. Our in-house agronomist formulates each application to match the seasonal needs of warm-season grasses like Bermuda and Zoysia.",
    details: [
      "Custom fertilizer blends formulated for Oklahoma's unique soil chemistry — not generic big-box products.",
      "Multi-application program timed to your grass type's growth cycle, typically 7-9 applications per year.",
      "Slow-release nitrogen for steady, sustained growth without surge-and-crash cycles.",
      "Blue dye verification on every application so you can see complete, even coverage.",
      "Soil testing available to identify specific nutrient deficiencies and pH imbalances.",
    ],
    benefits: [
      "Thicker, greener lawn within 2-3 weeks of first application",
      "Healthier root systems that resist drought and disease",
      "Reduced weed pressure as turf fills in bare spots",
      "Custom program — not a cookie-cutter approach",
    ],
    seasonalNote:
      "Our fertilization program runs from early spring (March) through late fall (November), with applications spaced 4-6 weeks apart.",
    faq: [
      {
        q: "How often should I fertilize my lawn in Oklahoma?",
        a: "Most Oklahoma lawns benefit from 7-9 applications per year, spaced 4-6 weeks apart from March through November. Our program is specifically timed to match Bermuda and Zoysia growth cycles.",
      },
      {
        q: "Is it safe for kids and pets?",
        a: "Yes. We recommend staying off the lawn until the application dries (typically 1-2 hours). Once dry, it's safe for children and pets.",
      },
      {
        q: "What makes your fertilizer different from store-bought?",
        a: "We custom-blend our fertilizers for Oklahoma's alkaline clay soil. Store-bought fertilizers are generic formulas that often don't account for our soil's high pH and specific nutrient needs.",
      },
    ],
  },
  "weed-control": {
    headline: "Year-Round Weed Control",
    intro:
      "Oklahoma's long growing season means weeds are a year-round battle. Our pre-emergent and post-emergent weed control program targets broadleaf weeds, crabgrass, dallisgrass, and other common Oklahoma invaders — while keeping your lawn healthy.",
    details: [
      "Pre-emergent applications in early spring and fall to prevent crabgrass, henbit, and other seasonal weeds before they germinate.",
      "Targeted post-emergent treatments for active weeds including dandelions, clover, nutsedge, and dallisgrass.",
      "Combination approach — our weed control is integrated with fertilization for maximum turf health and weed suppression.",
      "Blue dye coverage verification shows exactly where product was applied.",
      "Free resprays if weeds persist between regular visits.",
    ],
    benefits: [
      "Visible weed reduction within 7-14 days of treatment",
      "Year-round prevention, not just reactive treatment",
      "Healthier turf that naturally crowds out weeds",
      "Free resprays guaranteed",
    ],
    seasonalNote:
      "Pre-emergent goes down in February-March and again in September. Post-emergent treatments continue through the active growing season.",
    faq: [
      {
        q: "How long until weeds die after treatment?",
        a: "Most broadleaf weeds show visible wilting within 7-10 days and are fully dead within 2-3 weeks. Tougher weeds like dallisgrass and nutsedge may require a follow-up treatment.",
      },
      {
        q: "What if weeds come back between visits?",
        a: "We guarantee our work. If weeds return between scheduled visits, we'll come back and retreat at no additional cost.",
      },
      {
        q: "Will weed killer damage my lawn?",
        a: "Our products are selective — they target weeds without harming your Bermuda, Zoysia, or Fescue turf. We carefully calibrate application rates for your specific grass type.",
      },
    ],
  },
  "soil-conditioning": {
    headline: "Soil Conditioning & Amendment",
    intro:
      "Oklahoma's heavy clay soil compacts easily, restricts root growth, and holds too much moisture in wet seasons while baking rock-hard in summer. Our soil conditioning program improves structure, drainage, and nutrient availability from the ground up.",
    details: [
      "Liquid soil conditioner applications that break up compacted clay and improve soil structure.",
      "Humic acid and biochar amendments that increase organic matter and microbial activity.",
      "pH balancing for Oklahoma's naturally alkaline soils (typically 7.5-8.5 pH).",
      "Improved water infiltration reduces runoff and pudding.",
      "Often paired with core aeration for maximum benefit.",
    ],
    benefits: [
      "Deeper root growth in less compacted soil",
      "Better water absorption — less runoff and standing water",
      "Improved nutrient uptake from fertilizer applications",
      "Healthier soil biology that sustains long-term turf health",
    ],
    faq: [
      {
        q: "How do I know if my soil needs conditioning?",
        a: "If your lawn has standing water after rain, feels rock-hard in summer, or grass struggles despite regular fertilization — your soil likely needs conditioning. We can confirm with a soil test.",
      },
      {
        q: "How long until I see results?",
        a: "Soil improvement is gradual. You'll notice better water absorption within weeks, but meaningful structural change takes 2-3 seasons of consistent treatment.",
      },
    ],
  },
  "core-aeration": {
    headline: "Core Aeration",
    intro:
      "Core aeration pulls plugs of compacted soil from your lawn, allowing air, water, and nutrients to reach the root zone. It's one of the most impactful things you can do for an Oklahoma lawn struggling with heavy clay soil.",
    details: [
      "Mechanical core aeration using commercial-grade equipment that pulls 2-3 inch soil plugs.",
      "Relieves soil compaction from foot traffic, mowing, and Oklahoma's heavy clay composition.",
      "Opens channels for water, oxygen, and fertilizer to reach grass roots.",
      "Reduces thatch buildup by introducing soil microorganisms to the thatch layer.",
      "Best results when combined with overseeding and/or top dressing.",
    ],
    benefits: [
      "Immediate improvement in water infiltration",
      "Stronger, deeper root systems",
      "Better response to fertilization",
      "Reduced thatch buildup over time",
    ],
    seasonalNote:
      "For Bermuda and Zoysia (warm-season), aerate in late spring to early summer (May-June). For Fescue (cool-season), aerate in fall (September-October).",
    faq: [
      {
        q: "How often should I aerate my lawn?",
        a: "Most Oklahoma lawns benefit from annual aeration. High-traffic areas or heavily compacted soils may benefit from twice per year.",
      },
      {
        q: "What happens to the soil plugs?",
        a: "Leave them on the lawn — they'll break down within 2-3 weeks and return nutrients to the soil. Mowing will speed up the process.",
      },
      {
        q: "Should I water before or after aeration?",
        a: "Water the lawn 1-2 days before aeration so the soil is moist (not muddy). This allows the aerator to pull deeper plugs. Water lightly after to help the lawn recover.",
      },
    ],
  },
  "top-dressing": {
    headline: "Top Dressing",
    intro:
      "Top dressing adds a thin layer of quality soil amendment over your lawn, filling in low spots, improving soil composition, and creating an ideal environment for grass to thrive. Especially beneficial for Oklahoma's clay-heavy soils.",
    details: [
      "Custom blended top dressing material suited for Oklahoma soil conditions.",
      "Evens out low spots and minor grade irregularities for a smoother lawn surface.",
      "Adds organic matter to clay soil, improving long-term structure and drainage.",
      "Creates an ideal seedbed when combined with overseeding.",
      "Applied at the correct depth (1/4 to 1/2 inch) to improve soil without smothering grass.",
    ],
    benefits: [
      "Smoother, more even lawn surface",
      "Improved soil quality in the root zone",
      "Better seed-to-soil contact for overseeding",
      "Gradual transformation of clay soil over multiple seasons",
    ],
    seasonalNote:
      "Best applied in late spring for Bermuda lawns or early fall for Fescue lawns, ideally after aeration.",
    faq: [
      {
        q: "Will top dressing smother my grass?",
        a: "Not when applied correctly. We apply a thin layer (1/4 to 1/2 inch) that settles into the turf canopy without burying the grass blades.",
      },
      {
        q: "How often should I top dress?",
        a: "Once per year is typical. Lawns with significant grade issues or very poor soil may benefit from 2-3 annual applications until the soil improves.",
      },
    ],
  },
  overseeding: {
    headline: "Overseeding",
    intro:
      "Overseeding introduces new grass seed into your existing lawn to fill in thin spots, improve density, and introduce improved grass varieties. It's the fastest way to thicken a thin or patchy Oklahoma lawn.",
    details: [
      "Premium grass seed varieties selected for Oklahoma's climate — Bermuda, Zoysia, or Fescue depending on your lawn type.",
      "Best results when combined with core aeration (seed falls into aeration holes for better soil contact).",
      "Calibrated seed application rates for optimal coverage without wasteful over-application.",
      "Pre-seeding preparation including mowing low and debris removal.",
      "Post-seeding watering schedule guidance for maximum germination rates.",
    ],
    benefits: [
      "Thicker, denser turf that crowds out weeds",
      "Fills in bare and thin spots",
      "Introduces newer, more disease-resistant grass varieties",
      "Improved overall lawn appearance within 3-4 weeks",
    ],
    seasonalNote:
      "Bermuda overseeding: late May through June. Fescue overseeding: mid-September through mid-October. Timing is critical for germination success.",
    faq: [
      {
        q: "When is the best time to overseed in Oklahoma?",
        a: "For Bermuda lawns, late May to early June when soil temperatures are consistently above 65°F. For Fescue, mid-September to mid-October when temperatures cool down.",
      },
      {
        q: "How long until I see new grass?",
        a: "Bermuda seed germinates in 7-14 days; Fescue in 10-14 days. Full establishment takes 4-8 weeks with proper watering.",
      },
      {
        q: "Can I mow after overseeding?",
        a: "Wait until new grass reaches mowing height (about 3 inches for Fescue, 2 inches for Bermuda) before the first mow. This typically takes 3-4 weeks.",
      },
    ],
  },
  "grub-control": {
    headline: "Grub Control",
    intro:
      "White grubs — the larvae of June bugs, Japanese beetles, and masked chafers — feed on grass roots just below the soil surface. Left untreated, a grub infestation can kill entire sections of lawn in weeks. Our preventive and curative programs keep them in check.",
    details: [
      "Preventive application in late spring/early summer before grubs hatch and begin feeding.",
      "Curative treatment available for active infestations discovered later in the season.",
      "Targets white grubs from multiple beetle species common in Oklahoma.",
      "Products applied to the soil and watered in to reach the root zone where grubs feed.",
      "Annual preventive treatment is far more effective (and cheaper) than curative rescue treatment.",
    ],
    benefits: [
      "Prevents the root damage that causes dead patches",
      "Protects your investment in fertilization and overseeding",
      "Reduces secondary damage from armadillos and birds digging for grubs",
      "Peace of mind with annual preventive protection",
    ],
    seasonalNote:
      "Preventive grub control is applied in May-June. If you're seeing damage (brown patches that pull up like carpet), you may need a curative treatment in August-September.",
    faq: [
      {
        q: "How do I know if I have grubs?",
        a: "Signs include brown patches that pull up easily (like loose carpet), increased bird or armadillo activity on the lawn, and white C-shaped larvae visible when you dig in affected areas.",
      },
      {
        q: "Is preventive treatment really necessary?",
        a: "In Oklahoma, yes. Our warm climate and beetle populations make grub damage common. Preventive treatment costs a fraction of what it takes to repair grub-damaged turf.",
      },
    ],
  },
  "spring-dead-spot": {
    headline: "Spring Dead Spot Treatment",
    intro:
      "Spring dead spot is a fungal disease that attacks Bermuda grass roots during fall and winter, revealing circular dead patches when the lawn greens up in spring. It's one of the most damaging and frustrating lawn diseases in Oklahoma. Our targeted treatment program breaks the cycle.",
    details: [
      "Fall fungicide applications timed to when the pathogen is most active (September-November).",
      "Multiple applications may be needed for severe cases — typically 2 treatments, 28 days apart.",
      "Addresses the root-zone fungus (Ophiosphaerella species) that causes the disease.",
      "Paired with cultural recommendations: reduce thatch, improve drainage, manage nitrogen timing.",
      "Long-term management strategy — spring dead spot requires multi-year treatment for best results.",
    ],
    benefits: [
      "Reduced size and number of dead spots the following spring",
      "Faster recovery of existing damaged areas",
      "Break the annual cycle of recurring damage",
      "Comprehensive approach combining chemical and cultural practices",
    ],
    seasonalNote:
      "Treatment must happen in fall (September-October) BEFORE the fungus damages roots over winter. By the time you see dead spots in spring, the damage was done months earlier.",
    faq: [
      {
        q: "Why do I have to treat in fall for a spring problem?",
        a: "The fungus infects roots in fall and winter when Bermuda is dormant. Dead spots visible in spring are the result of damage already done. Fall treatment prevents the next cycle of infection.",
      },
      {
        q: "How long until spring dead spot goes away?",
        a: "Expect improvement over 1-2 seasons of consistent fall treatment. Severe cases may take 2-3 years to fully resolve. Cultural practices (aeration, dethatching) accelerate recovery.",
      },
      {
        q: "Can I just reseed the dead spots?",
        a: "The spots will usually fill in on their own as Bermuda spreads, but slowly. Reseeding or plugging can speed recovery. However, without treating the underlying fungus, new spots will appear each year.",
      },
    ],
  },
};

export const PEST_SERVICE_CONTENT: Record<string, ServiceContent> = {
  perimeter: {
    headline: "Perimeter Pest Control",
    intro:
      "Our perimeter pest control creates a protective barrier around your home's foundation, keeping ants, spiders, roaches, and other common Oklahoma pests outside where they belong. Quarterly treatments maintain year-round protection.",
    details: [
      "Exterior barrier treatment around the full perimeter of your home's foundation.",
      "Targets ants, spiders, roaches, crickets, silverfish, earwigs, and other common invaders.",
      "Granular and liquid applications for dual-action protection.",
      "Treatment of entry points: door frames, window sills, utility penetrations, weep holes.",
      "Quarterly service (every 90 days) maintains continuous protection.",
    ],
    benefits: [
      "Dramatically reduces indoor pest sightings",
      "Proactive barrier vs. reactive indoor spraying",
      "Safe for children and pets when dry",
      "Year-round protection with quarterly visits",
    ],
    faq: [
      {
        q: "How soon will I notice fewer bugs inside?",
        a: "Most customers see a significant reduction within 1-2 weeks of the first treatment. Full barrier effectiveness builds over the first 2-3 quarterly applications.",
      },
      {
        q: "Do I need to be home for treatment?",
        a: "No — perimeter treatment is entirely exterior. We treat and leave a door hanger with service details. You don't need to be present.",
      },
      {
        q: "Is it safe for pets?",
        a: "Yes. We recommend keeping pets off treated areas until dry (about 30 minutes). Once dry, the product bonds to surfaces and is safe for pets and children.",
      },
    ],
  },
  mosquito: {
    headline: "Mosquito Control",
    intro:
      "Oklahoma's warm, humid summers create ideal mosquito breeding conditions. Our mosquito control program combines barrier treatments with larvicide applications to dramatically reduce mosquito populations in your yard — so you can enjoy your outdoor space again.",
    details: [
      "Barrier spray applied to foliage, fence lines, and resting areas where mosquitoes harbor during the day.",
      "Larvicide treatments in standing water areas (drains, low spots, birdbaths) to break the breeding cycle.",
      "Treatments every 21 days during peak mosquito season (April-October).",
      "Products effective against common Oklahoma species including Asian tiger mosquitoes and Culex species.",
      "Pre-event treatments available for outdoor gatherings and parties.",
    ],
    benefits: [
      "Up to 90% reduction in mosquito activity in treated areas",
      "Enjoy your backyard without constant mosquito harassment",
      "Reduces risk of mosquito-borne diseases (West Nile, Zika)",
      "Special event treatments available on short notice",
    ],
    seasonalNote:
      "Mosquito season in Oklahoma runs roughly April through October. We recommend starting treatments in April before populations peak.",
    faq: [
      {
        q: "How long does each treatment last?",
        a: "Each barrier treatment provides approximately 21 days of protection. We schedule regular visits throughout the season to maintain coverage.",
      },
      {
        q: "Will it kill all mosquitoes?",
        a: "No treatment eliminates 100% of mosquitoes, but our program typically reduces populations by 85-90% in treated areas. Reducing standing water on your property improves results further.",
      },
      {
        q: "Is it safe for pollinators?",
        a: "We apply treatments in the evening when pollinators are less active and target mosquito resting areas (shady foliage, under decks) rather than flowering plants.",
      },
    ],
  },
  "flea-tick": {
    headline: "Flea & Tick Control",
    intro:
      "Oklahoma's outdoor lifestyle means your family and pets are exposed to fleas and ticks from spring through fall. Our yard treatment program eliminates existing populations and prevents reinfestation, protecting your family and four-legged friends.",
    details: [
      "Yard-wide treatment targeting areas where fleas and ticks live: shaded areas, tall grass edges, under decks and porches.",
      "Products effective against dog ticks, deer ticks (Lone Star ticks are prevalent in Oklahoma), and flea populations.",
      "Treatments every 30 days during flea and tick season.",
      "Focus on transition zones between lawn and natural areas where ticks are most concentrated.",
      "Complementary to (not a replacement for) pet flea/tick medications.",
    ],
    benefits: [
      "Dramatic reduction in flea and tick populations in your yard",
      "Safer outdoor play for children and pets",
      "Reduces risk of tick-borne illnesses (Lyme disease, Rocky Mountain spotted fever, ehrlichiosis)",
      "Peace of mind during Oklahoma's long warm season",
    ],
    seasonalNote:
      "Flea and tick season in Oklahoma runs March through November. Start treatments early for best results.",
    faq: [
      {
        q: "Do I still need flea/tick medication for my pets?",
        a: "Yes — yard treatment and pet medication work together. Yard treatment reduces the outdoor population; pet medication protects when pets leave the treated area.",
      },
      {
        q: "How soon can pets go on the treated lawn?",
        a: "Wait until the treatment dries completely, typically 30-60 minutes. Once dry, it's safe for pets and children.",
      },
    ],
  },
  chigger: {
    headline: "Chigger Control",
    intro:
      "If you've lived in Oklahoma, you know chiggers. These microscopic mites lurk in tall grass, brush, and shaded areas, causing intensely itchy bites that last for days. Our chigger treatment targets their habitat to make your yard comfortable again.",
    details: [
      "Targeted treatment of chigger habitat: tall grass edges, brush lines, shaded ground cover, and low vegetation.",
      "Residual products that continue working for weeks after application.",
      "Focus on areas where people and pets are most likely to encounter chiggers.",
      "Treatments during peak chigger season (May-September).",
      "Cultural recommendations: keep grass mowed short, reduce leaf litter, trim brush edges.",
    ],
    benefits: [
      "Dramatically reduces chigger encounters in treated areas",
      "Enjoy your yard without the constant itch",
      "Targeted approach minimizes product use",
      "Practical advice to reduce chigger habitat long-term",
    ],
    seasonalNote:
      "Chigger season peaks June through August in Oklahoma. Treatments are most effective when started in May before populations explode.",
    faq: [
      {
        q: "Can you completely eliminate chiggers from my yard?",
        a: "We can dramatically reduce populations in treated areas, but chiggers can migrate from surrounding untreated areas. Regular treatments and habitat management provide the best ongoing control.",
      },
      {
        q: "How long do chigger bites last?",
        a: "Chigger bites typically itch intensely for 1-3 days and may remain visible for 1-2 weeks. The bites themselves aren't dangerous, just very uncomfortable.",
      },
    ],
  },
  armyworm: {
    headline: "Armyworm Control",
    intro:
      "Fall armyworms can devastate an Oklahoma lawn in days — literally eating it down to bare soil. These caterpillars migrate into Oklahoma in late summer and can strip a lawn overnight. Fast response is critical when armyworms strike.",
    details: [
      "Rapid response treatment when armyworm activity is detected or reported.",
      "Products that kill active armyworms on contact and provide residual protection.",
      "Coverage of the entire lawn — armyworms can be present even where damage isn't visible yet.",
      "Monitoring for armyworm activity during peak season (August-October).",
      "Post-treatment lawn recovery guidance (watering, fertilization timing).",
    ],
    benefits: [
      "Fast-acting treatment stops damage within hours",
      "Saves your lawn from total loss",
      "Residual protection against reinfestation",
      "Recovery plan to get your lawn back quickly",
    ],
    seasonalNote:
      "Armyworm season in Oklahoma peaks August through October. Watch for birds feeding heavily on your lawn — it's often the first sign of armyworms.",
    faq: [
      {
        q: "How do I know if I have armyworms?",
        a: "Look for: rapidly expanding brown patches, small green/brown caterpillars (1-1.5 inches) in the grass, and heavy bird activity on the lawn. Armyworms feed primarily at dawn and dusk.",
      },
      {
        q: "Can my lawn recover from armyworm damage?",
        a: "Usually yes — if the grass crowns and roots survived, Bermuda will recover within 3-4 weeks with proper watering and fertilization. Severe cases may need overseeding.",
      },
      {
        q: "Will armyworms come back after treatment?",
        a: "Armyworms are migratory, so new waves can arrive throughout the season. Our treatment provides residual protection, but severe moth flights may require a second application.",
      },
    ],
  },
  bagworm: {
    headline: "Bagworm Treatment",
    intro:
      "Bagworms attack evergreen trees and shrubs — junipers, arborvitae, and cedars are their favorite targets in Oklahoma. Left untreated, they can defoliate and kill trees within a season or two. Early treatment while larvae are small is the key to control.",
    details: [
      "Targeted spray treatment of affected trees and shrubs during the vulnerable larval stage.",
      "Products are most effective when applied in late May to mid-June while bags are small.",
      "Coverage of all affected plant material — bagworms can spread between adjacent trees.",
      "Manual bag removal recommendations for heavy infestations.",
      "Monitoring for bagworm activity in future seasons.",
    ],
    benefits: [
      "Stops defoliation and saves your evergreens",
      "Most effective when caught early (small bags)",
      "Prevents spread to neighboring trees and shrubs",
      "Protects landscape investment",
    ],
    seasonalNote:
      "Bagworm larvae hatch in late May and begin feeding immediately. Treat in late May through mid-June for best results. By August, the bags are too large for effective treatment.",
    faq: [
      {
        q: "When is the best time to treat bagworms?",
        a: "Late May to mid-June, when larvae have recently hatched and bags are still small (under 1/2 inch). Treatment effectiveness drops significantly after July.",
      },
      {
        q: "Should I remove the bags by hand?",
        a: "Yes — hand removal of large bags (especially in fall/winter) removes eggs that will hatch next spring. Each bag can contain 500-1,000 eggs.",
      },
      {
        q: "Can a tree recover from bagworm damage?",
        a: "Deciduous trees usually recover. Evergreens (junipers, cedars) that lose more than 80% of their needles often cannot recover, which is why early treatment is critical.",
      },
    ],
  },
  webworm: {
    headline: "Webworm Treatment",
    intro:
      "Fall webworms create large, unsightly webs in the canopy of pecan, walnut, persimmon, and other Oklahoma hardwoods. While they rarely kill established trees, heavy infestations can defoliate branches and weaken trees over time.",
    details: [
      "Targeted treatment of webworm nests and surrounding foliage.",
      "Products that kill caterpillars inside and around the web structures.",
      "Treatment of accessible tree canopy — tall trees may require specialized equipment.",
      "Timing treatments when webs are first forming and caterpillars are small.",
      "Cultural approach: web removal by pruning when nests are within reach.",
    ],
    benefits: [
      "Eliminates unsightly web nests",
      "Prevents defoliation of affected branches",
      "Protects tree health over multiple seasons",
      "Improves curb appeal",
    ],
    seasonalNote:
      "Webworm season runs from late June through September in Oklahoma. Two generations per year are common — treat early nests to reduce the second generation.",
    faq: [
      {
        q: "Will webworms kill my tree?",
        a: "Healthy, established trees rarely die from webworm damage alone. However, repeated heavy defoliation over multiple years can stress trees and make them vulnerable to other problems.",
      },
      {
        q: "Can I just tear out the webs?",
        a: "Yes — if you can reach them. Pruning out web nests (bag them and dispose) is effective for small infestations. Chemical treatment is better for widespread or high-canopy problems.",
      },
      {
        q: "What's the difference between bagworms and webworms?",
        a: "Bagworms attack evergreens and build individual hanging bags. Webworms attack hardwoods and build communal web nests in branch forks. Different pests, different trees, different timing.",
      },
    ],
  },
};

// Homepage FAQ — general questions about Elite's services
export const HOMEPAGE_FAQ = [
  {
    q: "How does your instant quote system work?",
    a: "Enter your address and our system measures your property using satellite imagery. Select the services you need and get an accurate price in minutes — no phone call or site visit required.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve 17 communities across the Oklahoma City metro, including OKC, Edmond, Norman, Moore, Mustang, Yukon, Midwest City, and more. Check our service areas page for the full list.",
  },
  {
    q: "Are your treatments safe for kids and pets?",
    a: "Yes. We recommend staying off treated areas until dry (typically 30-60 minutes). Once dry, all products are safe for children and pets. We use EPA-registered products applied by licensed technicians.",
  },
  {
    q: "What if I'm not satisfied with a treatment?",
    a: "We guarantee our work with free resprays. If you're not happy with the results, we come back and retreat at no additional cost.",
  },
  {
    q: "Do you offer both lawn care and pest control?",
    a: "Yes — we're a full-service lawn care and pest control company. Many customers bundle both services for the best value and a single provider for all their outdoor needs.",
  },
  {
    q: "What makes Elite different from other lawn care companies?",
    a: "Body cameras on every visit for full transparency, an in-house agronomist who formulates custom fertilizer blends for Oklahoma soil, blue dye coverage verification on every application, and over 1,700 five-star Google reviews backing our reputation.",
  },
  {
    q: "How do I get started?",
    a: "Get an instant quote online or call us at (405) 735-1223. We'll set you up with a customized program based on your lawn's specific needs.",
  },
];
