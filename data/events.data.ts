export interface SageEvent {
  id: string;              // slug; must match the Cloudinary folder name
  title: string;
  date: string;            // ISO 8601
  endDate?: string;
  location: string;
  type: 'hackathon' | 'workshop' | 'seminar' | 'webinar' | 'bootcamp';
  description: string;     // 1-2 lines
  image: string;           // Cloudinary path -> sage/events/<id>/cover.jpg
  gallery?: string[];      // sage/events/<id>/gallery/*, past events only
  registrationUrl?: string;// Google Form link; upcoming events only
}

export const events: SageEvent[] = [
  {
    id: 'sage-inauguration',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'seminar',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-inauguration/cover.jpg',
    gallery: [
      'sage/events/sage-inauguration/gallery/1.jpg',
      'sage/events/sage-inauguration/gallery/2.jpg',
      'sage/events/sage-inauguration/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-symposium',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'seminar',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-symposium/cover.jpg',
    gallery: [
      'sage/events/sage-symposium/gallery/1.jpg',
      'sage/events/sage-symposium/gallery/2.jpg',
      'sage/events/sage-symposium/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-x-rvce',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'workshop',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-x-rvce/cover.jpg',
    gallery: [
      'sage/events/sage-x-rvce/gallery/1.jpg',
      'sage/events/sage-x-rvce/gallery/2.jpg',
      'sage/events/sage-x-rvce/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-rvce-2',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'workshop',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-rvce-2/cover.jpg',
    gallery: [
      'sage/events/sage-rvce-2/gallery/1.jpg',
      'sage/events/sage-rvce-2/gallery/2.jpg',
      'sage/events/sage-rvce-2/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-bmsit-symposium',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'seminar',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-bmsit-symposium/cover.jpg',
    gallery: [
      'sage/events/sage-bmsit-symposium/gallery/1.jpg',
      'sage/events/sage-bmsit-symposium/gallery/2.jpg',
      'sage/events/sage-bmsit-symposium/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-vit',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'seminar',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-vit/cover.jpg',
    gallery: [
      'sage/events/sage-vit/gallery/1.jpg',
      'sage/events/sage-vit/gallery/2.jpg',
      'sage/events/sage-vit/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-dinner-get-together',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'seminar',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-dinner-get-together/cover.jpg',
    gallery: [
      'sage/events/sage-dinner-get-together/gallery/1.jpg',
      'sage/events/sage-dinner-get-together/gallery/2.jpg',
      'sage/events/sage-dinner-get-together/gallery/3.jpg',
    ],
  },
  {
    id: 'sage-lunch-get-together',
    title: '', // TODO(scarlet)
    date: '2024-01-01', // TODO(scarlet)
    location: '', // TODO(scarlet)
    type: 'seminar',
    description: '', // TODO(scarlet)
    image: 'sage/events/sage-lunch-get-together/cover.jpg',
    gallery: [
      'sage/events/sage-lunch-get-together/gallery/1.jpg',
      'sage/events/sage-lunch-get-together/gallery/2.jpg',
      'sage/events/sage-lunch-get-together/gallery/3.jpg',
    ],
  },
];
