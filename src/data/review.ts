export interface Review {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number; // 1–5
  date: string;
  title: string;
  body: string;
  product?: string; // optional product name they're reviewing
}

export const reviews: Review[] = [
  {
    id: 'r-1',
    name: 'Fatema Khanam',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    date: '2024-09-10',
    title: 'Best ghee I have ever tasted!',
    body: 'The deshi ghee is absolutely pure and fragrant. You can smell the quality the moment you open the jar. My family has been using it every day since our first order.',
    product: 'Pure Deshi Ghee',
  },
  {
    id: 'r-2',
    name: 'Rafiqul Islam',
    location: 'Chittagong, Bangladesh',
    rating: 5,
    date: '2024-08-22',
    title: 'Authentic Sundarban honey — no compromise',
    body: 'I have tried many honey brands but nothing comes close to this. Thick, raw, and naturally sweet. Will definitely order again and again.',
    product: 'Sundarban Forest Honey',
  },
  {
    id: 'r-3',
    name: 'Nadia Sultana',
    location: 'Sylhet, Bangladesh',
    rating: 5,
    date: '2024-10-01',
    title: 'Premium quality nuts — fresh & crunchy',
    body: 'Ordered the mixed nuts pack and was amazed by the freshness. Packaging was secure and delivery was quick. Great value for money!',
    product: 'Mixed Nuts Pack',
  },
  {
    id: 'r-4',
    name: 'Mamun Hossain',
    location: 'Rajshahi, Bangladesh',
    rating: 4,
    date: '2024-07-15',
    title: 'Quality spices with true aroma',
    body: 'The spice blends are very authentic. You can tell they are freshly ground. My cooking has improved noticeably. Would love to see more variety added.',
    product: 'Bangladeshi Spice Mix',
  },
  {
    id: 'r-5',
    name: 'Tahmina Begum',
    location: 'Khulna, Bangladesh',
    rating: 5,
    date: '2024-09-28',
    title: 'Trusted source for organic products',
    body: 'I have been ordering from AOM for 6 months now. Every product has been consistent in quality. Customer support is also very helpful. Highly recommended!',
  },
  {
    id: 'r-6',
    name: 'Sabbir Ahmed',
    location: 'Comilla, Bangladesh',
    rating: 5,
    date: '2024-08-05',
    title: 'Gift-worthy packaging & great taste',
    body: 'Bought a combo pack as a gift for my parents. They loved it! The packaging was elegant and the products inside were top-notch. Will be ordering more gifts from here.',
  },
];
