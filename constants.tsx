
import React from 'react';
import { TourDetail, BlogPost, FAQItem } from './types';

export const COLORS = {
  primary: '#011A52', // Deep Blue
  accent: '#FFAF04',  // Vibrant Yellow
  text: '#666666',    // Grey
};

export const TOURS: TourDetail[] = [
  {
    id: 'free-walking-tour-cusco',
    name: 'Free Walking Tour (Cusco)',
    category: 'Free',
    duration: '2 Hours',
    difficulty: 'Easy',
    description: 'The best introduction to the history, culture, and secrets of the Inca Empire capital. Tours depart daily at 10 AM, 1 PM and 3:30 PM.',
    longDescription: 'Join our passionate local guides for a journey through the cobblestone streets of Cusco. We cover everything from the majestic Plaza de Armas to the mysterious hidden alleys of the San Blas neighborhood.',
    image: 'free-tour-prompt',
    price: 'Pay what you feel',
    priceDisclaimer: 'Our walking tour is free because we believe everyone should experience the magic of Cusco. However, to keep this tour sustainable and to fairly support our passionate local guides and team members, we kindly ask each guest to contribute at least $10 USD at the end of the tour.\n\nYour support helps us continue offering what many travelers consider the best free walking tour in Cusco — authentic stories, local knowledge, and unforgettable experiences. Thank you for valuing our work and for helping us keep this project alive for future travelers.',
    itinerary: [
      { 
        day: 1, 
        title: 'The Meeting Point', 
        description: 'Meet your guide at the Plaza de Armas McDonald\'s entrance.', 
        activities: ['Group introduction', 'Safety briefing', 'Historical overview of the Main Square'] 
      },
      { 
        day: 2, 
        title: 'Intikijllu Alley & Inca Walls', 
        description: 'Walk through the most iconic Inca passage in the city.', 
        activities: ['Appreciate Inca stonework', 'History of the Sun Temple (Coricancha)', 'Empire expansion stories'] 
      },
      { 
        day: 3, 
        title: 'Temple of the Sun (Qoricancha)', 
        description: 'Understand the cosmic vision and the gold-covered walls of the empire.', 
        activities: ['Inca astronomy', 'Colonial vs Inca architecture', 'Religious syncretism'] 
      },
      { 
        day: 4, 
        title: 'Pachkuteq\'s Palace', 
        description: 'Explore the foundations of the greatest Inca Emperor\'s residence.', 
        activities: ['Legacy of Pachacuteq', 'Urban planning of Cusco', 'Royal lineages'] 
      },
      { 
        day: 5, 
        title: 'Twelve-Sided Stone', 
        description: 'Behold the masterpiece of ancient engineering at the Hatunrumiyoc street.', 
        activities: ['Stone masonry techniques', 'Hidden shapes in the wall', 'Cultural significance'] 
      },
      { 
        day: 6, 
        title: 'School of the Incas (Yachaywasi)', 
        description: 'Learn where the elite was educated in the heart of the capital.', 
        activities: ['Inca education system', 'Amautas (Teachers)', 'Oral traditions'] 
      },
      { 
        day: 7, 
        title: 'Incredible San Blas View Point', 
        description: 'The most stunning panoramic vista of the red roofs of Cusco.', 
        activities: ['Panoramic photography', 'Orientation of the valley', 'History of the artisan district'] 
      },
      { 
        day: 8, 
        title: 'Pisco & Chocolate Tasting', 
        description: 'End the tour with a treat for your senses.', 
        activities: ['Local pisco sour demonstration', 'Organic Peruvian chocolate tasting', 'Final Q&A and local recommendations'] 
      },
    ],
    inclusions: ['Certified Local Guide', 'English & Spanish options', 'Pisco & Chocolate samples', 'Personalized local tips'],
    exclusions: ['Tips (Gratuity based)', 'Personal expenses', 'Museum entry tickets'],
  },
  {
    id: 'salkantay-adventure-9d',
    name: 'Salkantay Adventure',
    category: 'Trek',
    duration: '9 Days',
    difficulty: 'Challenging',
    description: 'The ultimate 9-day backpacker circuit covering food, valley, trek, and Rainbow Mountain.',
    longDescription: 'Our most comprehensive backpacker package. Designed for those who want to see it all without the stress of individual bookings. From the cobblestone streets of Cusco to the glaciers of Salkantay and the colors of Vinicunca.',
    image: 'salkantay-9d-prompt',
    price: '$485',
    itinerary: [
      { day: 1, title: 'Cusco Food Tour', description: 'Sample the best of Andean flavors in local markets.', activities: ['San Pedro market visit', 'Street food tasting', 'Chicha tasting'] },
      { day: 2, title: 'Sacred Valley Exploration', description: 'Visit Pisac and Ollantaytambo ruins.', activities: ['Ruins exploration', 'Artisan market', 'Lunch in Urubamba'] },
      { day: 3, title: 'Salkantay Trek: Day 1', description: 'Ascend to the high camps near Humantay Lake.', activities: ['Humantay Lake hike', 'Glacial views'] },
      { day: 4, title: 'Salkantay Trek: Day 2', description: 'Conquer the Salkantay Pass (4,630m).', activities: ['High pass crossing', 'Glacier photography'] },
      { day: 5, title: 'Salkantay Trek: Day 3', description: 'Descend into the cloud forest.', activities: ['Coffee plantations', 'Tropical flora'] },
      { day: 6, title: 'Salkantay Trek: Day 4', description: 'Arrival at Machu Picchu Citadel.', activities: ['Sunrise at the sanctuary', 'Guided tour', 'Train to Cusco'] },
      { day: 7, title: 'Resting in Cusco', description: 'A well-deserved free day to recover and explore at your pace.', activities: ['San Blas walk', 'Relaxing at hostels'] },
      { day: 8, title: 'Rainbow Mountain', description: 'Witness the incredible colors of Vinicunca.', activities: ['Early morning hike', 'Andean scenery', 'Alpaca spotting'] },
      { day: 9, title: 'Return Journey', description: 'Transfer to the airport or station for your return to Lima.', activities: ['Farewell breakfast', 'Transfer out'] },
    ],
    inclusions: ['All Guided Tours', 'Salkantay 4-Day Trek', 'Entrance Ticket to Machu Picchu', 'Nice Hostel Accommodation', 'All Trail Meals', 'Local Transportation'],
    exclusions: ['Sleeping bags', 'Last day lunch in Lima', 'Tips'],
  },
  {
    id: 'mountains-rainforest-11d',
    name: 'Mountains & Rainforest',
    category: 'Amazon',
    duration: '11 Days',
    difficulty: 'Challenging',
    description: 'A massive 11-day expedition combining the Andes and the Amazon rainforest.',
    longDescription: 'The "Grand Circuit". This package follows the Salkantay Adventure for the first 8 days, then jets you off to the deep Amazon for an unforgettable jungle experience. Flights included!',
    image: 'mtn-forest-prompt',
    price: '$995',
    itinerary: [
      { day: 1, title: 'Cusco Welcome & Food Tour', description: 'Start your journey with a taste of Cusco.', activities: ['Market tour', 'Local treats'] },
      { day: 2, title: 'Sacred Valley', description: 'History and landscapes of the Incas.', activities: ['Ruins', 'Market'] },
      { day: 3, title: 'Salkantay Trek Day 1', description: 'Ascend into the mountains.', activities: ['Lake hike'] },
      { day: 4, title: 'Salkantay Trek Day 2', description: 'The high pass.', activities: ['Glacier views'] },
      { day: 5, title: 'Salkantay Trek Day 3', description: 'Jungle descent.', activities: ['Tropical valley'] },
      { day: 6, title: 'Machu Picchu Day', description: 'Explore the world wonder.', activities: ['Guided tour'] },
      { day: 7, title: 'Cusco Rest Day', description: 'Chill in the imperial city.', activities: ['Laundry and relaxation'] },
      { day: 8, title: 'Rainbow Mountain', description: 'High altitude colors.', activities: ['Summit hike'] },
      { day: 9, title: 'Flight to Puerto Maldonado', description: 'Fly into the heart of the Amazon.', activities: ['Airport transfer', 'River boat ride', 'Lodge arrival'] },
      { day: 10, title: 'Rainforest Exploration', description: 'Deep jungle trek and wildlife spotting.', activities: ['Caiman spotting', 'Macaw clay lick', 'Canopy walk'] },
      { day: 11, title: 'Amazon & Flight to Lima', description: 'One last jungle morning before flying to the capital.', activities: ['Morning boat ride', 'Transfer to airport', 'Flight to Lima'] },
    ],
    inclusions: ['All Tours & Treks', 'Entrance to Machu Picchu', 'Hostel Accommodations', 'Domestic Flight to Puerto Maldonado', 'Flight from Amazon to Lima', 'Amazon Meals included', 'Lodge stay in Amazon'],
    exclusions: ['Alcoholic drinks', 'Tips', 'Laundry'],
  },
  {
    id: 'machu-picchu-last-minute',
    name: 'Machu Picchu Last Minute',
    category: 'Trek',
    duration: '2 Days',
    difficulty: 'Easy',
    description: 'Guaranteed entrance to Machu Picchu even if official tickets are sold out online.',
    longDescription: 'Struggling to find tickets? Our Last Minute Machu Picchu program is designed specifically for travelers who couldn\'t secure official entrance tickets in advance. Through our local network and specialized circuit allocations, we guarantee your visit to the citadel with a professional licensed guide and full logistics included.',
    image: 'last-minute-prompt',
    price: '$385',
    itinerary: [
      { 
        day: 1, 
        title: 'Cusco - Ollantaytambo - Train to Aguas Calientes', 
        description: 'Scenic journey from the Andes to the cloud forest.', 
        activities: ['Private transport to Ollantaytambo', 'Expedition train journey', 'Check-in at Aguas Calientes hotel', 'Evening briefing with guide'] 
      },
      { 
        day: 2, 
        title: 'Machu Picchu Citadel - Return to Cusco', 
        description: 'The highlight of your trip with a specialized guided tour.', 
        activities: ['Early bus to the sanctuary', 'Guaranteed entrance ticket', '2.5 hour professional guided tour', 'Return train and shuttle to Cusco'] 
      }
    ],
    inclusions: ['All Transportation (Cusco-Station-Cusco)', 'Train Tickets (Round trip)', 'Entrance Ticket to Machu Picchu (Guaranteed)', 'Bus Tickets (Aguas Calientes - Citadel)', 'Local Licensed Tour Guide', '1 Night Accommodation in Aguas Calientes'],
    exclusions: ['Meals not mentioned', 'Tips', 'Personal expenses'],
  },
  {
    id: 'inka-jungle-trek-4-day',
    name: 'Inka Jungle Trek',
    category: 'Trek',
    duration: '4 Days',
    difficulty: 'Moderate',
    description: 'The ultimate action-packed multi-sport adventure to Machu Picchu.',
    longDescription: 'Experience the most diverse route to Machu Picchu. This adventure combines downhill mountain biking through the cloud forest, included river rafting, trekking on original Inca trails, and included zip-lining before arriving at the citadel.',
    image: 'inka-jungle-prompt',
    price: '$470',
    itinerary: [
      { 
        day: 1, 
        title: 'Abra Malaga - Santa Maria (Biking & Rafting)', 
        description: 'Downhill mountain biking from snowy peaks to the high jungle followed by an afternoon of rafting on the river.', 
        activities: ['Mountain biking descent', 'Tropical fruit plantation tour', 'White water rafting'] 
      },
      { 
        day: 2, 
        title: 'Santa Maria - Santa Teresa (Trekking)', 
        description: 'Hike through original Inca paths and enjoy the Cocalmayo hot springs.', 
        activities: ['Original Inca trail hiking', 'Flora and fauna spotting', 'Relaxing at thermal baths'] 
      },
      { 
        day: 3, 
        title: 'Santa Teresa - Aguas Calientes', 
        description: 'Hike along the railway line with views of Machu Picchu\'s back side.', 
        activities: ['Zip-lining adventure', 'Hiking by the riverside', 'Evening in Aguas Calientes town'] 
      },
      { 
        day: 4, 
        title: 'Machu Picchu Citadel', 
        description: 'Guided tour of the world wonder at sunrise.', 
        activities: ['Citadel tour', 'Panoramic views', 'Train return to Cusco'] 
      },
    ],
    inclusions: ['Professional Adventure Guide', 'Mountain Biking Equipment', 'Transportation Cusco-Trailhead', 'All Meals (excluding final dinner)', 'Entrance Ticket to Machu Picchu', 'Hostel Accommodations', 'River Rafting', 'Zip-lining', 'Bus Tickets (Aguas Calientes - Machu Picchu)'],
    exclusions: ['Alcoholic drinks', 'Personal travel insurance', 'Tips'],
  },
  {
    id: 'inka-trail-2-day',
    name: 'Inka Trail Short Version',
    category: 'Trek',
    duration: '2 Days',
    difficulty: 'Moderate',
    description: 'The express route to the Sun Gate for those with limited time.',
    longDescription: 'Experience a significant portion of the original Inca Trail in just two days. This trek takes you through the beautiful Wiñay Wayna ruins and provides your first glimpse of Machu Picchu from the iconic Sun Gate.',
    image: 'inka-trail-2-prompt',
    price: '$550',
    itinerary: [
      { day: 1, title: 'Cusco - Km 104 - Sun Gate', description: 'Take the train to the trailhead and hike to the Sun Gate.', activities: ['Km 104 start', 'Wiñay Wayna ruins', 'Sun Gate arrival', 'Machu Picchu first view'] },
      { day: 2, title: 'Machu Picchu Sanctuary', description: ' a complete guided tour of the citadel at the best time.', activities: ['Guided tour of Citadel', 'Exploring the terraces', 'Return train to Cusco'] },
    ],
    inclusions: ['Professional Guide', 'Train Tickets', 'Bus Tickets', 'Entrance Fees', 'Box Lunch', '1 Night Hotel in Aguas Calientes'],
    exclusions: ['Tips', 'Breakfast on Day 1', 'Dinner on Day 2'],
  },
  {
    id: 'inka-trail-4-day',
    name: 'Classic Inka Trail',
    category: 'Trek',
    duration: '4 Days',
    difficulty: 'Moderate',
    description: 'The world-famous journey through high Andean passes to Machu Picchu.',
    longDescription: 'Experience the original pilgrimage used by the Incas. This route combines history, ecology, and adventure in a way no other trek can.',
    image: 'inka-trail-prompt',
    price: '$850',
    itinerary: [
      { day: 1, title: 'Cusco to Wayllabamba', description: 'Begin your journey with a light hike through cacti-filled valleys.', activities: ['Ruins of Llactapata visit', 'Mountain views'] },
      { day: 2, title: 'Dead Woman’s Pass', description: 'Reach the highest point (4215m) for breathtaking views.', activities: ['Steep ascent', 'High altitude pass'] },
      { day: 3, title: 'The Cloud Forest', description: 'Descending into lush tropical vegetation and Incan tunnels.', activities: ['Ruins of Wiñay Wayna', 'Cloud forest exploration'] },
      { day: 4, title: 'The Sun Gate', description: 'An early start to witness Machu Picchu at sunrise.', activities: ['Sun Gate arrival', 'Guided tour of Citadel'] },
    ],
    inclusions: ['Professional Guide', 'Porters', 'Camping Equipment', 'All Meals', 'Train Ticket', 'Bus Ticket'],
    exclusions: ['Sleeping Bag', 'Tips', 'First Breakfast', 'Last Lunch'],
  },
  {
    id: 'salkantay-4-day',
    name: 'Salkantay Adventure',
    category: 'Trek',
    duration: '4 Days',
    difficulty: 'Challenging',
    description: 'The ultimate alternative trek crossing glaciers and jungle to Machu Picchu.',
    longDescription: 'Named one of the 25 best treks in the world by National Geographic. A high-altitude adventure from snowy peaks to lush coffee plantations.',
    image: 'salkantay-prompt',
    price: '$282',
    itinerary: [
      { day: 1, title: 'Cusco - Soraypampa - Humantay Lake', description: 'Hike to the turquoise Humantay Lake under the Salkantay glacier.', activities: ['Humantay Lake hike', 'Eco-camp stay', 'Mountain orientation'] },
      { day: 2, title: 'The Salkantay Pass to Chaullay', description: 'Conquer the 4,600m pass near the glacier and descend into the cloud forest.', activities: ['High altitude pass', 'Glacier views', 'Descent to high jungle'] },
      { day: 3, title: 'Cloud Forest - Hydroelectric - Aguas Calientes', description: 'Trek through tropical canopy and transportation along the Urubamba river.', activities: ['Coffee plantation visit', 'River valley trek', 'Aguas Calientes stay'] },
      { day: 4, title: 'Machu Picchu Sanctuary', description: 'The grand finale: a guided tour of the citadel at sunrise.', activities: ['Machu Picchu guided tour', 'Return transportation to Cusco'] },
    ],
    inclusions: ['Expedition Guide', 'Muleteers', 'All Meals', 'Camping Gear', '1 Night Hotel', 'Transportation'],
    exclusions: ['Sleeping bag', 'Tips', 'Personal travel insurance'],
  },
  {
    id: 'ausangate-trek-5-day',
    name: 'Ausangate & Rainbow Mountain',
    category: 'Trek',
    duration: '4 Days',
    difficulty: 'Expert',
    description: 'A high-altitude circuit around the sacred Apu Ausangate and the Rainbow Mountain.',
    longDescription: 'The Ausangate trek is a spectacular journey through the Vilcanota mountain range. It offers some of the most stunning landscapes in the Cusco region, including turquoise lakes and the famous Rainbow Mountain.',
    image: 'ausangate-prompt',
    price: '$520',
    itinerary: [
      { 
        day: 1, 
        title: 'Cusco - Tinqui - Upis Lake - Upis', 
        description: 'Drive from Cusco to Tinqui, trek towards the stunning Upis Lake and camp near the thermal springs.', 
        activities: ['Scenic drive', 'Andean village visit', 'Upis hot springs'] 
      },
      { 
        day: 2, 
        title: 'Upis - Arapa Pass - Yancocha - Puka Cocha', 
        description: 'Cross the challenging Arapa Pass (4,850m) and witness the multi-colored glacial lakes before reaching Puka Cocha.', 
        activities: ['High pass ascent', 'Photography of turquoise lakes', 'Glacier camping'] 
      },
      { 
        day: 3, 
        title: 'Puka Cocha - Apacheta Pass - Ananta - Surini Pass - Queulla Cocha', 
        description: 'A demanding day crossing two high passes with panoramic views of the Vilcanota range.', 
        activities: ['High altitude endurance', 'Apacheta Pass crossing', 'Remote valley trekking'] 
      },
      { 
        day: 4, 
        title: 'Queulla Cocha - Rainbow Mountain - Red Valley - Cusco', 
        description: 'The highlight: witness the colors of Vinicunca at sunrise followed by the dramatic Red Valley before returning to Cusco.', 
        activities: ['Rainbow Mountain sunrise', 'Red Valley trek', 'Return to Cusco'] 
      }
    ],
    inclusions: ['Expert High-Altitude Guide', 'Horsemen & Mules', 'Quality Camping Gear', 'Oxygen & First Aid', 'All Meals', 'Transportation'],
    exclusions: ['Sleeping bag', 'Tips', 'First breakfast', 'Last dinner'],
  },
  {
    id: 'choquequirao-trek-4-day',
    name: 'Choquequirao: The Lost Citadel',
    category: 'Trek',
    duration: '4 Days',
    difficulty: 'Challenging',
    description: 'Visit the "Sister City" of Machu Picchu, remote and twice as large.',
    longDescription: 'Choquequirao is a hidden gem. Accessible only by foot, this trek takes you deep into the Apurimac canyon to witness ruins that receive fewer than 50 visitors a day.',
    image: 'choquequirao-prompt',
    price: '$690',
    itinerary: [
      { day: 1, title: 'Cusco - Chiquisca - Marampata', description: 'Descent into the deep Apurimac canyon and climb to the beautiful Marampata plateau.', activities: ['Canyon views', 'River crossing', 'Challenging ascent'] },
      { day: 2, title: 'Marampata - Choquequirao Exploration - Marampata', description: 'Full day exploring the terraces and plazas of the majestic Choquequirao.', activities: ['Guided tour of ruins', 'Llama terraces', 'Sunset at the sanctuary'] },
      { day: 3, title: 'Marampata - Chiquisca', description: 'Descent back to the canyon floor to enjoy the lush vegetation and warm climate.', activities: ['Photography of the valley', 'River views', 'Relax at camp'] },
      { day: 4, title: 'Chiquisca - Capuliyoc - Cusco', description: 'Final climb back to the Capuliyoc lookout and return trip to Cusco.', activities: ['Final ascent', 'Capuliyoc panoramic view', 'Return to Cusco'] },
    ],
    inclusions: ['Specialist Ruins Guide', 'Muleteers & Mules', 'Entrance Fees', 'Camping Equipment', 'All Meals', 'Private Transport'],
    exclusions: ['Sleeping bag', 'Tips', 'Alcoholic drinks', 'Water on day 1'],
  },
  {
    id: 'manu-national-park',
    name: 'Manu National Park Expedition',
    category: 'Amazon',
    duration: '4 Days',
    difficulty: 'Moderate',
    description: 'Venture into the heart of the world’s most biodiverse forest.',
    longDescription: 'A scientific wonder. Manu offers a unique look at untouched rainforest ecosystems, from macaw clay licks to giant river otters.',
    image: 'manu-prompt',
    price: '$850',
    itinerary: [
      { day: 1, title: 'Cloud Forest to Rainforest', description: 'Descend from the Andes into the humid forest.', activities: ['Bird watching', 'Lodge stay'] },
      { day: 2, title: 'Deep Manu', description: 'River boat travel deep into the biosphere reserve.', activities: ['River navigation', 'Spotting caimans'] },
      { day: 3, title: 'Macaw Clay Lick', description: 'Early morning spectacle of hundreds of colorful birds.', activities: ['Clay lick visit', 'Forest trails'] },
      { day: 4, title: 'Return to Civilization', description: 'A final morning in the jungle before flying back to Cusco.', activities: ['Wildlife breakfast', 'Return travel'] },
    ],
    inclusions: ['Naturalist Guide', 'Boat Transportation', 'Eco-Lodges', 'Meals', 'Park Entrance Fees'],
    exclusions: ['Personal gear', 'Tips', 'Alcoholic beverages'],
  },
  {
    id: 'tambopata-reserve-3-day',
    name: 'Tambopata National Reserve',
    category: 'Amazon',
    duration: '3 Days',
    difficulty: 'Easy',
    description: 'Explore the crystalline waters of Sandoval Lake and walk among the jungle canopy.',
    longDescription: 'Tambopata offers a high-density wildlife experience perfect for short visits. Witness giant river otters, caimans, and a vibrant canopy of life just hours from Puerto Maldonado.',
    image: 'tambopata-prompt',
    price: '$390',
    itinerary: [
      { day: 1, title: 'Cusco - Puerto Maldonado - Jungle Lodge', description: 'Flight and boat transfer to your eco-lodge followed by a night walk.', activities: ['River boat ride', 'Nocturnal wildlife spotting'] },
      { day: 2, title: 'Sandoval Lake & Canopy Walkway', description: 'Canoe across the lake and walk 30 meters above the jungle floor.', activities: ['Canoeing', 'Giant otter spotting', 'Treetop bridges'] },
      { day: 3, title: 'Parrot Clay Lick & Return', description: 'Early morning spectacle of hundreds of parrots before flying back.', activities: ['Bird watching spectacle', 'Final jungle breakfast', 'Airport transfer'] },
    ],
    inclusions: ['Bilingual Naturalist Guide', 'Eco-Lodge Accommodation', 'All Meals in Jungle', 'Airport Transfers', 'Excursion Equipment'],
    exclusions: ['Domestic Flights', 'Travel Insurance', 'Tips', 'Alcoholic Beverages'],
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-acclimatize',
    title: 'How to Acclimatize to Altitude in Cusco',
    excerpt: 'Simple steps to avoid soroche (altitude sickness) and enjoy your trek.',
    content: 'Acclimatization is key to a successful Peru trip. Drink plenty of water, avoid alcohol for the first 48 hours, and try the local coca tea...',
    author: 'Juan Adventure',
    date: 'Jan 15, 2026',
    image: 'https://picsum.photos/seed/blog1/800/400',
    category: 'Safety',
  },
  {
    id: 'best-time-machu-picchu',
    title: 'When is the Best Time to Visit Machu Picchu?',
    excerpt: 'The rainy season vs. the dry season - a detailed breakdown.',
    content: 'Cusco has two main seasons. The dry season (May-September) offers clear skies but crowds, while the rainy season...',
    author: 'Elena Cusco',
    date: 'Feb 10, 2026',
    image: 'https://picsum.photos/seed/blog2/800/400',
    category: 'Planning',
  }
];

export const FAQS: FAQItem[] = [
  { category: 'Booking', question: 'How do I book a free tour?', answer: 'Simply fill out our quick booking form! No deposit required.' },
  { category: 'Trekking', question: 'What is the difficulty of the Inca Trail?', answer: 'It is considered moderate but high altitude makes it challenging for some.' },
  { category: 'Amazon', question: 'Do I need a yellow fever vaccine?', answer: 'It is highly recommended for jungle expeditions.' },
  { category: 'Tipping', question: 'How much should I tip on free tours?', answer: 'Most people tip between $10-$20 USD depending on satisfaction.' }
];
