export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  tag?: string;
  description?: string;
}

export interface SpeakerItem {
  name: string;
  role: string;
  bio: string;
}

export interface ResourceItemData {
  title: string;
  meta: string;
  downloadUrl?: string;
  icon?: string;
}

export interface SageEvent {
  id: string;              // slug; must match URL path
  title: string;
  badge?: string;          // e.g. "Valedictory Ceremony", "Workshop", "Symposium"
  date: string;            // ISO 8601 YYYY-MM-DD
  endDate?: string;
  location: string;
  venueDetails?: string;   // e.g. "RVCE Auditorium, Bangalore"
  scheduleTime?: string;   // e.g. "Full Day Event" or "9:30 AM – 5:00 PM"
  type: 'hackathon' | 'workshop' | 'seminar' | 'webinar' | 'bootcamp';
  description: string;     // Short summary for cards and meta
  aboutText?: string;      // Detailed long overview paragraph
  highlights?: string[];   // Bullet points for Workshop/Event Highlights
  whoShouldAttend?: string;// Target audience description
  chiefGuestsText?: string;// Summary of chief guests / dignitaries
  duration?: string;       // e.g. "1 Day", "2 Days", "36 Hours"
  participants?: string | number; // e.g. "39", "120+"
  certificates?: string;   // e.g. "Distributed", "Awarded to All"
  statusText?: string;     // e.g. "Completed", "Registration Open"
  agenda?: ScheduleItem[]; // Detailed chronological schedule
  speakers?: SpeakerItem[];// Key speakers & chief guests
  resources?: ResourceItemData[]; // Downloadable PDFs/brochures
  image: string;           // Cloudinary path -> sage/events/<id>/cover.jpg
  gallery?: string[];      // sage/events/<id>/gallery/*, past events only
  registrationUrl?: string;// Google Form link; upcoming events only
}

export const events: SageEvent[] = [
  {
    id: 'sage-rvce-2',
    title: 'SAGE - RVCE - KEYSIGHT Workshop - Valedictory Function',
    badge: 'Valedictory Ceremony',
    date: '2025-11-19',
    location: 'RVCE Campus',
    venueDetails: 'RVCE Auditorium & Campus, Bangalore',
    scheduleTime: 'Full Day Event (9:00 AM – 5:00 PM)',
    duration: '1 Day',
    participants: '39',
    certificates: 'Distributed',
    statusText: 'Completed',
    type: 'workshop',
    description:
      'The Valedictory Function of the SAGE–RVCE–Keysight Hands-on and In-depth Workshop on 5G-Band GaAs FET RF Amplifier marks the successful completion of an intensive two-phase journey with 39 participants completing the full RF design cycle.',
    aboutText:
      'The Valedictory Function of the SAGE–RVCE–Keysight Hands-on and In-depth Workshop on 5G-Band GaAs FET RF Amplifier marks the successful completion of an intensive two-phase journey. Organized by Shastry Associates and Global Enterprises, RV College of Engineering, and Keysight Technologies, this workshop brought together 39 participants who completed the full RF design cycle—from theory and simulation to fabrication and real-world measurements.',
    highlights: [
      'Complete RF amplifier design cycle from simulation to hardware testing',
      'Hands-on measurements with Keysight professional equipment',
      'Industry-level exposure bridging academia and real-world applications',
      'Guidance from SAGE experts, DRDO & ISRO veterans, and industry engineers',
      'Certificate distribution and felicitation of mentors and participants',
      'Recognition of contributions from RV College, Keysight, and SAGE teams',
    ],
    chiefGuestsText:
      'Dr. K. D. Nayak (Former Director General, DRDO) | Dr. Surendra Pal (Former Associate Director, ISRO) | Prof. V. Mahadevan (Former ISRO Scientist, PES University) | Industry experts from Keysight Technologies | Faculty and coordinators from RV College of Engineering',
    whoShouldAttend:
      'Electronics & Communication engineering students, RF/Microwave researchers, faculty members, and engineers passionate about hands-on 5G RF hardware implementation.',
    agenda: [
      {
        time: 'Opening',
        title: 'Welcome & Introduction',
        speaker: 'Ms. Neha Kantikar (Chief Coordinator, SAGE Youth Wing) & Ms. Vrinda V. Patil (Chair, IEEE MTTS, RVCE)',
        tag: 'Opening Address',
      },
      {
        time: 'Session 1',
        title: 'Introduction of Chief Guests',
        speaker: 'Dr. Nagamani (Head of Department, ETE, RVCE)',
        tag: 'Welcome Address',
      },
      {
        time: 'Session 2',
        title: 'Industry Expert Address',
        speaker: 'Mr. Ambarish & Mr. Sharath (Keysight Technologies)',
        tag: 'Industry Insights',
      },
      {
        time: 'Keynote',
        title: 'Chief Guest Address',
        speaker: 'Dr. K. D. Nayak (Former DG DRDO, SAGE Executive Board Member)',
        tag: 'Keynote Address',
      },
      {
        time: 'Guest Address',
        title: 'Guest of Honour Address',
        speaker: 'Dr. Surendra Pal (Former Associate Director ISRO, SAGE Advisory Board)',
        tag: 'Guest Address',
      },
      {
        time: 'Distinguished',
        title: 'Distinguished Guest Address',
        speaker: 'Prof. V. Mahadevan (Former ISRO Scientist, PES University)',
        tag: 'Guest Address',
      },
      {
        time: 'Feedback',
        title: 'Participant Feedback Session',
        speaker: 'Interactive sharing of project experiences by workshop student participants',
        tag: 'Testimonials',
      },
      {
        time: 'Felicitation',
        title: 'Felicitation & Recognition',
        speaker: 'Recognition of mentors from RVCE, Keysight Technologies, and SAGE',
        tag: 'Honors & Awards',
      },
      {
        time: 'Certificates',
        title: 'Certificate Distribution',
        speaker: '39 participants awarded completion certificates by Chief Guests',
        tag: 'Recognition',
      },
      {
        time: 'Closing',
        title: 'Closing Remarks & Vote of Thanks',
        speaker: 'Coordinators, Mentors, and Organizers',
        tag: 'Vote of Thanks',
      },
    ],
    speakers: [
      {
        name: 'Dr. K. D. Nayak',
        role: 'Distinguished Scientist',
        bio: 'Former Director General, DRDO | Honorary Distinguished Professor, IIT Guwahati | SAGE Executive Board Member',
      },
      {
        name: 'Dr. Surendra Pal',
        role: 'Former Associate Director, ISRO',
        bio: 'Former Vice Chancellor, DIAT | Pioneer in Satellite Communication & GNSS | SAGE Advisory Board Member',
      },
      {
        name: 'Prof. V. Mahadevan',
        role: 'Former ISRO Scientist',
        bio: 'Professor, PES University | Expert in Phased Array Antennas | SAGE Advisory Board Member',
      },
      {
        name: 'Dr. Prasad Shastry',
        role: 'Founder & Chair, SAGE',
        bio: 'Professor of Microwave and Wireless Engineering, Bradley University, USA',
      },
      {
        name: 'Dr. M. H. Kori',
        role: 'Executive Board Member, SAGE',
        bio: 'Former Tech. Director, Alcatel Lucent Technologies',
      },
      {
        name: 'Dr. Nagamani',
        role: 'Head of Department, ETE',
        bio: 'RV College of Engineering, Bangalore',
      },
      {
        name: 'Keysight Technologies Team',
        role: 'Industry Experts & Mentors',
        bio: 'Mr. Ambarish, Mr. Sharath, Mr. Anantha Shayana, Mr. Pratik Khurana, Ms. Shrutika',
      },
      {
        name: 'Event Hosts & Coordinators',
        role: 'Coordinators',
        bio: 'Ms. Neha Kantikar (Chief Coordinator, SAGE Youth Wing), Ms. Vrinda V. Patil (Chair, IEEE MTTS, RVCE), Mr. Visvajit Ganesh, Ms. Preethi',
      },
    ],
    image: '/events/sage-rvce-2/cover.jpg',
    gallery: [
      '/events/sage-rvce-2/gallery/1.jpg',
      '/events/sage-rvce-2/gallery/2.jpg',
      '/events/sage-rvce-2/gallery/3.jpg',
      '/events/sage-rvce-2/gallery/4.jpg',
    ],
  },
  {
    id: 'sage-x-rvce',
    title: 'SAGE - RVCE - KEYSIGHT Workshop',
    badge: 'Hands-on Workshop',
    date: '2025-11-17',
    endDate: '2025-11-19',
    location: 'RVCE Campus',
    venueDetails: 'RVCE Auditorium',
    scheduleTime: '9:00 AM - 5:00 PM',
    duration: '3 Days',
    participants: '100+',
    certificates: 'Participation Certificates',
    statusText: 'Completed',
    type: 'workshop',
    description:
      'Master the complete lifecycle of 5G RF power amplifier development in this intensive, hands-on workshop.',
    aboutText:
      'Master the complete lifecycle of 5G RF power amplifier development in this intensive, hands-on workshop. Participants design, simulate, and fabricate a GaAs FET RF amplifier for 5G frequencies, then return to test real circuits using Keysight professional measurement equipment. Guided by SAGE experts and industry engineers, you\'ll bridge theory and practice in RF/microwave engineering.',
    highlights: [
      'RF amplifier design principles for 5G frequency bands',
      'Circuit simulation and layout creation for tape-out',
      'PCB fabrication workflow and component soldering techniques',
      'Hands-on testing with Keysight spectrum analyzers and network analyzers',
      'S-parameter measurements and performance characterization',
      'Industry-standard design-to-deployment methodologies',
    ],
    whoShouldAttend:
      'Electronics & Communication students | RF/Microwave engineering researchers | Faculty members teaching analog/RF courses | Industry professionals in wireless communication | Anyone passionate about practical 5G hardware design and development.',
    chiefGuestsText:
      'Dr. Prasad Shastry (Bradley University) | Dr. M. H. Kori (Former Tech Dir Alcatel-Lucent) | Dr. K. D. Nayak (Former DG DRDO) | Keysight Technologies Engineering Team',
    agenda: [
      { time: '09:30', title: 'Invocation & Lighting of Lamp', speaker: 'RVCE & SAGE Coordinators', tag: 'Ceremony' },
      { time: '09:40', title: 'Welcome Address', speaker: 'Dr. Geetha & Dr. Nagamani', tag: 'Welcome' },
      { time: '09:45', title: 'Introduction to Workshop', speaker: 'Dr. Prasad Shastry', tag: 'Session' },
      { time: '10:10', title: 'Inaugural Address', speaker: 'Dr. K. D. Nayak (Former DG DRDO)', tag: 'Keynote' },
      { time: '10:20', title: 'Presidential Address', speaker: 'Dr. K. N. Subramanya (Principal RVCE)', tag: 'Address' },
      { time: '11:00', title: 'RF Amplifier Simulation & ADS Workshop', speaker: 'Mr. Pratik Khurana (Keysight EDA)', tag: 'Hands-on' },
    ],
    speakers: [
      { name: 'Dr. Prasad Shastry', role: 'Founder and Chair, SAGE', bio: 'Professor of Microwave and Wireless Engineering, Bradley University, USA' },
      { name: 'Dr. M. H. Kori', role: 'Executive Board Member, SAGE', bio: 'Former Tech. Director, Alcatel Lucent Technologies' },
      { name: 'Dr. G. Boopalan', role: 'Associate, SAGE', bio: 'Associate Professor, Vellore Institute of Technology, Vellore' },
      { name: 'Dr. P. Shanthi', role: 'Associate, SAGE', bio: 'Associate Professor, RVCE, Bangalore' },
      { name: 'Mr. Pratik Khurana', role: 'Sr. Solutions Engineer', bio: 'Keysight EDA Software' },
    ],
    image: '/events/sage-x-rvce/cover.jpg',
    gallery: [
      '/events/sage-x-rvce/gallery/1.jpg',
      '/events/sage-x-rvce/gallery/2.jpg',
      '/events/sage-x-rvce/gallery/3.jpg',
      '/events/sage-x-rvce/gallery/4.jpg',
    ],
  },
  {
    id: 'sage-vit',
    title: 'SENSORA - graVITas \'25 (SAGE-VIT Event)',
    badge: 'Techno-Management Event',
    date: '2025-09-26',
    location: 'VIT Vellore',
    venueDetails: 'Rajaji Hall & MB Classroom, VIT Vellore',
    scheduleTime: 'September 26 & 27, 2025 (Both Days – 10:00 AM to 9:00 PM)',
    duration: '36 Hours',
    participants: '200+',
    certificates: 'Certificates of Participation',
    statusText: 'Completed',
    type: 'hackathon',
    description:
      'SENSORA is a prestigious Techno-Management Event organized by the Instrument Society of India (ISOI) – VIT Chapter under the flagship technical fest graVITas \'25 at Vellore Institute of Technology (VIT), sponsored by SAGE.',
    aboutText:
      'SENSORA is a prestigious Techno-Management Event organized by the Instrument Society of India (ISOI) – VIT Chapter under the flagship technical fest graVITas \'25 at Vellore Institute of Technology (VIT). This dynamic event brings together innovators, tech enthusiasts, and future leaders for an exciting journey of workshops, expert talks, and a thrilling 36-hour Hackathon. SENSORA is where technology meets groundbreaking ideas, fostering creativity, collaboration, and cutting-edge solutions. "Hack, stack, never look back – Sensora\'s path keeps you right on track"',
    highlights: [
      'Two-day Techno-Management Event featuring workshops, talks, and a 36-hour hackathon',
      'Organized by ISOI – The Instrument Society of India (VIT Chapter)',
      'Part of graVITas \'25 – VIT\'s flagship technical festival',
      'Sponsored by SAGE – Shastry Associates\' Global Enterprises',
      'Partnered with Institution\'s Innovation Council (Ministry of HRD Initiative)',
      'Supported by Oracle Workforce Development Program, SAE, CNN News18, Hello FM, and StartupTN',
      'Hands-on technical workshops and expert-led sessions',
      'Platform for innovation, networking, and skill development',
      'Focus on emerging technologies and industry-relevant solutions',
    ],
    whoShouldAttend:
      'Engineering students | Technology enthusiasts | Innovators and hackers | Startup founders | Researchers | Industry professionals | Anyone passionate about technology and innovation',
    chiefGuestsText:
      'SAGE (Title Sponsor) | ISOI – VIT Chapter (Organizer) | graVITas \'25 | Institution\'s Innovation Council | Oracle Workforce Development Program | SAE | CNN News18 | Hello FM | StartupTN',
    agenda: [
      { time: 'Day 1 • 10:00', title: 'Registration & Welcome', speaker: 'ISOI VIT Chapter (Check-in and event briefing)', tag: 'Briefing' },
      { time: 'Day 1 • 10:30', title: 'Inauguration Ceremony', speaker: 'Welcome Address by ISOI VIT, Guest of Honour: SAGE & IIC Representatives', tag: 'Inauguration' },
      { time: 'Day 1 • 11:00', title: 'Workshop Session 1: Emerging Technologies in Instrumentation & Sensors', speaker: 'Industry Expert Session', tag: 'Workshop' },
      { time: 'Day 1 • 12:30', title: 'Lunch Break', speaker: 'All Participants', tag: 'Break' },
      { time: 'Day 1 • 13:30', title: 'Workshop Session 2: Hands-on Technical Workshop', speaker: 'Oracle Workforce Development Program Session', tag: 'Hands-on' },
      { time: 'Day 1 • 15:00', title: 'Hackathon Launch & Problem Statement Reveal', speaker: '36-Hour Hackathon Kickoff', tag: 'Launch' },
      { time: 'Day 1 • 15:30', title: 'Hackathon - Phase 1: Ideation & Development', speaker: 'Team brainstorming and development begins', tag: 'Hackathon' },
      { time: 'Day 2 • 09:00', title: 'Morning Session: Expert Talk on Innovation & Entrepreneurship', speaker: 'StartupTN Representative', tag: 'Expert Talk' },
      { time: 'Day 2 • 10:00', title: 'Hackathon - Phase 2: Mentor Support & Prototyping', speaker: 'Mentor Support Sessions', tag: 'Hackathon' },
      { time: 'Day 2 • 12:00', title: 'Lunch Break', speaker: 'All Participants', tag: 'Break' },
      { time: 'Day 2 • 13:00', title: 'Hackathon - Final Sprint', speaker: 'Final development, integration, and testing phase', tag: 'Sprint' },
      { time: 'Day 2 • 15:00', title: 'Project Presentations & Live Demos', speaker: 'Teams present solutions to judging panel', tag: 'Presentations' },
      { time: 'Day 2 • 17:00', title: 'Judging & Evaluation', speaker: 'Expert Evaluation Panel', tag: 'Judging' },
      { time: 'Day 2 • 18:00', title: 'Prize Distribution & Closing Ceremony', speaker: 'Winners Announcement, Certificates, Vote of Thanks', tag: 'Awards' },
    ],
    speakers: [
      { name: 'SAGE Leadership', role: 'Title Sponsor', bio: 'Shastry Associates\' Global Enterprises' },
      { name: 'ISOI – VIT Chapter Mentors', role: 'Event Organizers', bio: 'The Instrument Society of India, Vellore Institute of Technology' },
      { name: 'Dr. G. Boopalan', role: 'Associate Professor, VIT', bio: 'Faculty Coordinator & SAGE Associate' },
      { name: 'Oracle Workforce Team', role: 'Technology Partner', bio: 'Oracle Workforce Development Program' },
      { name: 'StartupTN Mentors', role: 'Ecosystem Partner', bio: 'Startup Ecosystem & Entrepreneurship Mentorship' },
    ],
    image: '/events/sage-vit/cover.jpg',
    gallery: [
      '/events/sage-vit/gallery/1.jpg',
      '/events/sage-vit/gallery/2.jpg',
      '/events/sage-vit/gallery/3.jpg',
      '/events/sage-vit/gallery/4.jpg',
      '/events/sage-vit/gallery/5.jpg',
    ],
  },
  {
    id: 'sage-lunch-get-together',
    title: 'SAGE Lunch Get-Together',
    badge: 'Get-Together',
    date: '2025-08-20',
    location: 'SATTVAM Restaurant',
    venueDetails: 'SATTVAM Restaurant, Bengaluru',
    scheduleTime: '12:00 PM – 2:00 PM',
    duration: '2 Hours',
    participants: '20+',
    certificates: 'Complimentary Lunch',
    statusText: 'Completed',
    type: 'seminar',
    description:
      'A casual and relaxed afternoon bringing together SAGE members to celebrate recent activities, share updates, and enjoy delicious food in a friendly atmosphere.',
    aboutText:
      'The SAGE Lunch Get-Together is a casual and relaxed afternoon designed to bring together members to celebrate recent activities, share updates, and enjoy delicious food in a friendly atmosphere. This event provides an excellent opportunity for networking, exchanging ideas, and strengthening connections within the SAGE community.',
    highlights: [
      'Delicious vegetarian lunch buffet with diverse cuisines',
      'Networking opportunities with fellow SAGE members',
      'Informal discussions about recent activities and upcoming initiatives',
      'Celebration of achievements and milestones',
    ],
    whoShouldAttend:
      'All SAGE members, volunteers, and supporters are warmly invited to join this casual gathering and connect with the community.',
    chiefGuestsText:
      'Dr. Prasad Shastry | Dr. K. D. Nayak | Dr. Surendra Pal | Dr. M. H. Kori',
    agenda: [
      { time: '12:00', title: 'Arrival & Welcome', speaker: 'SAGE Team', tag: 'Welcome' },
      { time: '12:30', title: 'Lunch & Networking', speaker: 'All Members', tag: 'Lunch' },
      { time: '13:30', title: 'Informal Discussions & Updates', speaker: 'All Attendees', tag: 'Discussion' },
      { time: '14:00', title: 'Closing & Fellowship', speaker: 'SAGE Leadership', tag: 'Closing' },
    ],
    speakers: [
      { name: 'SAGE Leadership Team', role: 'Organizers', bio: 'Shastry Associates Global Enterprises' },
    ],
    image: '/events/sage-lunch-get-together/cover.jpg',
    gallery: [
      '/events/sage-lunch-get-together/gallery/1.jpg',
      '/events/sage-lunch-get-together/gallery/2.jpg',
      '/events/sage-lunch-get-together/gallery/3.jpg',
      '/events/sage-lunch-get-together/gallery/4.jpg',
    ],
  },
  {
    id: 'sage-bmsit-symposium',
    title: 'SAGE - BMSIT Symposium on RF MEMS',
    badge: 'National Symposium',
    date: '2025-08-01',
    endDate: '2025-08-02',
    location: 'BMSIT, Yelahanka, Bengaluru',
    venueDetails: 'BMS Institute of Technology, Yelahanka, Bengaluru',
    scheduleTime: 'August 1 & 2, 2025 (Both Days – 9:30 AM onwards)',
    duration: '2 Days',
    participants: '100+',
    certificates: 'Distributed',
    statusText: 'Completed',
    type: 'seminar',
    description:
      'Two-day national-level symposium on RF MEMS in Biomedical systems, 5G communications, and Electronic Warfare featuring an industrial visit to SITAR, DRDO.',
    aboutText:
      'The SAGE – BMSIT Symposium on RF MEMS is a two-day technical symposium jointly organized by Shastry Associates\' Global Enterprises (SAGE) and BMS Institute of Technology (BMSIT). The symposium focuses on the design, fabrication, and applications of RF MEMS in Biomedical systems, 5G and beyond communications, and Electronic Warfare systems. The event brings together distinguished scientists from DRDO, IISc, CSIR-NAL, IITs, industry professionals, and academic leaders to discuss emerging technologies, indigenization challenges, and interdisciplinary research directions in RF MEMS.',
    highlights: [
      'Two-day national-level symposium on RF MEMS and advanced communication technologies',
      'Jointly organized by Shastry Associates\' Global Enterprises (SAGE) and BMS Institute of Technology (BMSIT)',
      'Technical focus on Biomedical systems, 5G & beyond communications, and Electronic Warfare applications',
      'Distinguished speakers from DRDO, IISc, IITs, CSIR-NAL, academia, and industry',
      'Keynote address on next-generation RF MEMS technologies and interdisciplinary research',
      'Industrial visit to SITAR, DRDO for real-world exposure',
      'Platform for industry–academia interaction and collaborative research discussions',
      'Free parking facility available for all participants',
    ],
    whoShouldAttend:
      'Academicians and researchers | Industry professionals | Students of Electronics, Communication and allied disciplines | Entrepreneurs | Anyone interested in India\'s technology and innovation ecosystem.',
    chiefGuestsText:
      'Dr. K. D. Nayak (Chief Guest) | Dr. Ravi M R (CEO SITAR DRDO) | Prof. K. J. Vinoy (IISc) | Dr. Sanjay H. A. (Principal BMSIT)',
    agenda: [
      { time: '09:30 – 10:00', title: 'Registration', speaker: 'Organizing Committee', tag: 'Registration' },
      { time: '10:00 – 11:15', title: 'Inauguration & Addresses', speaker: 'Chief Guest: Dr. K. D. Nayak | Guest of Honour: Dr. Ravi M R | Dignitaries from SAGE & BMSIT', tag: 'Inauguration' },
      { time: '11:15 – 12:00', title: 'Keynote: RF MEMS and other Interdisciplinary Technologies for Next Generation Communications', speaker: 'Dr. K. J. Vinoy, Professor, IISc Bangalore', tag: 'Keynote' },
      { time: '12:00 – 12:15', title: 'Coffee Break', speaker: '', tag: 'Break' },
      { time: '12:15 – 01:00', title: 'Technical Talk: RF MEMS in 5G & other Wireless Communications', speaker: 'Dr. M. H. Kori, Former Technical Director, Alcatel Lucent', tag: 'Technical' },
      { time: '01:00 – 01:45', title: 'Lunch', speaker: '', tag: 'Break' },
      { time: '01:45 – 04:45', title: 'Industrial Visit to SITAR, DRDO', speaker: 'DRDO Scientific Staff', tag: 'Industry Visit' },
      { time: 'Day 2 • 09:30 – 10:15', title: 'Technical Talk: RF MEMS for Radar and Biomedical Applications', speaker: 'Dr. Anita V R, Associate Professor, BMSIT', tag: 'Technical' },
      { time: 'Day 2 • 10:15 – 11:00', title: 'Technical Talk: Trends and Challenges in Indigenization of Certified Antennas', speaker: 'Dr. Balamati Choudhary, Scientist SF, CSIR-NAL', tag: 'Technical' },
      { time: 'Day 2 • 11:00 – 11:15', title: 'Coffee Break', speaker: '', tag: 'Break' },
      { time: 'Day 2 • 11:15 – 12:00', title: 'Technical Talk: Integrated RF MEMS in Radar Systems', speaker: 'Prof. Harjinder Singh Bhatia, Former LRDE, DRDO', tag: 'Technical' },
      { time: 'Day 2 • 12:00 – 12:45', title: 'Technical Talk: Fabrication of RF MEMS', speaker: 'Dr. Shankar Prasad, IIT Guwahati', tag: 'Technical' },
      { time: 'Day 2 • 12:45 – 01:30', title: 'Lunch', speaker: '', tag: 'Break' },
      { time: 'Day 2 • 01:45 – 02:30', title: 'Industry Talk: Packaging of RF MEMS', speaker: 'Mr. S. Gurunathan, Deputy Manager, STARC-C', tag: 'Industry' },
      { time: 'Day 2 • 02:40 onwards', title: 'Valedictory Session', speaker: 'Organizing Committee', tag: 'Valedictory' },
    ],
    speakers: [
      { name: 'Dr. K. D. Nayak', role: 'Chief Guest', bio: 'Distinguished DRDO Scientist | Former Director General – MED, CS & Cyber Security' },
      { name: 'Dr. Ravi M R', role: 'Guest of Honour', bio: 'Chief Executive Officer, Bangalore SITAR (DRDO)' },
      { name: 'Dr. Sanjay H. A.', role: 'Presiding the Inauguration', bio: 'Principal, BMS Institute of Technology & Management' },
      { name: 'Dr. K. J. Vinoy', role: 'Keynote Speaker', bio: 'Professor, Electrical Communication Engineering, IISc, Bengaluru' },
      { name: 'Dr. Prasad Shastry', role: 'Special Guest', bio: 'Founder & Chair, SAGE | Professor, Bradley University, USA' },
      { name: 'Dr. M. H. Kori', role: 'Technical Speaker', bio: 'Former Technical Director, Alcatel-Lucent Technologies | Executive Board Member, SAGE USA' },
      { name: 'Dr. Anita V R', role: 'Technical Speaker', bio: 'Associate Professor, BMS Institute of Technology & Management' },
      { name: 'Dr. Balamati Choudhary', role: 'Technical Speaker', bio: 'Scientist SF, CSIR–NAL, Bengaluru' },
      { name: 'Mr. S. Gurunathan', role: 'Industry Speaker', bio: 'Deputy Manager, STARC-C, Bengaluru' },
    ],
    image: '/events/sage-bmsit-symposium/cover.jpg',
    gallery: [
      '/events/sage-bmsit-symposium/gallery/1.jpg',
      '/events/sage-bmsit-symposium/gallery/2.jpg',
    ],
  },
  {
    id: 'sage-dinner-get-together',
    title: 'SAGE Youth Wing Dinner Get-Together',
    badge: 'Get-Together',
    date: '2025-06-15',
    location: 'Subz Restaurant',
    venueDetails: 'Subz Restaurant, Bengaluru',
    scheduleTime: '7:00 PM – 10:00 PM',
    duration: '3 Hours',
    participants: '20+',
    certificates: 'Complimentary Dinner',
    statusText: 'Completed',
    type: 'seminar',
    description:
      'A fun and relaxed evening bringing together SAGE Youth Wing members to celebrate achievements, strengthen bonds, and enjoy great food and conversation.',
    aboutText:
      'The SAGE Youth Wing Dinner Get-Together is a fun and relaxed evening designed to bring together youth wing members to celebrate achievements, strengthen bonds, and enjoy great food and conversation. This event provides an excellent opportunity for networking, sharing experiences, and building lasting friendships within the SAGE community.',
    highlights: [
      'Delicious multi-cuisine dinner with vegetarian options',
      'Networking opportunities with fellow SAGE youth wing members',
      'Fun activities, games, and entertainment throughout the evening',
      'Recognition and celebration of recent achievements and milestones',
    ],
    whoShouldAttend:
      'All SAGE Youth Wing members, alumni, and guests are warmly invited to join this special evening of celebration and fellowship.',
    chiefGuestsText:
      'SAGE Youth Wing Leadership Team | Advisory Board Representatives',
    agenda: [
      { time: '19:00', title: 'Welcome & Gathering', speaker: 'SAGE Youth Wing Team', tag: 'Welcome' },
      { time: '19:30', title: 'Dinner & Networking', speaker: 'All Members', tag: 'Dinner' },
      { time: '20:30', title: 'Celebration & Recognition', speaker: 'Leadership Team', tag: 'Recognition' },
      { time: '21:30', title: 'Closing & Fellowship', speaker: 'All Attendees', tag: 'Closing' },
    ],
    speakers: [
      { name: 'SAGE Youth Wing Team', role: 'Organizers', bio: 'SAGE Youth Wing Leadership' },
    ],
    image: '/events/sage-dinner-get-together/cover.jpg',
    gallery: [
      '/events/sage-dinner-get-together/gallery/1.jpg',
      '/events/sage-dinner-get-together/gallery/2.jpg',
      '/events/sage-dinner-get-together/gallery/3.jpg',
    ],
  },
  {
    id: 'ui-ux',
    title: 'Awards Ceremony of SAGE UI/UX Design Challenge',
    badge: 'Awards Ceremony',
    date: '2024-12-15',
    location: 'Ramaiah Institute of Technology, Bengaluru',
    venueDetails: 'MSRIT Auditorium, Ramaiah Institute of Technology, Bengaluru',
    scheduleTime: 'Afternoon Session (2:00 PM – 6:00 PM)',
    duration: 'Half Day',
    participants: '100+',
    certificates: 'Awarded to Winners & Finalists',
    statusText: 'Completed',
    type: 'seminar',
    description:
      'Official Awards Ceremony of the SAGE UI/UX Design Challenge organized in collaboration with Ramaiah Institute of Technology, IEEE Bangalore Section, IEEE Computer Society, IEEE AP-S, and IEEE MTT-S.',
    aboutText:
      'The Awards Ceremony of the SAGE UI/UX Design Challenge celebrated exceptional student talent in designing user-friendly interfaces, digital interaction models, and modern design systems for engineering applications. Organized jointly by Shastry Associates Global Enterprises (SAGE), Ramaiah Institute of Technology (MSRIT), IEEE Bangalore Section, IEEE Computer Society, IEEE AP-S, and IEEE MTT-S, the ceremony brought together distinguished academicians, IEEE mentors, and student finalists.',
    highlights: [
      'Jointly organized by SAGE, Ramaiah Institute of Technology, IEEE Bangalore Section, IEEE Computer Society, IEEE AP-S, and IEEE MTT-S',
      'Exhibition and showcase of top student UI/UX design prototypes and interfaces',
      'Keynote addresses by distinguished IEEE leaders and industry experts on human-centered software design',
      'Felicitation of competition winners, runners-up, student coordinators, and jury members',
      'Awarding of merit certificates and cash prizes to winning student design teams',
    ],
    whoShouldAttend:
      'UI/UX designers, engineering students, software developers, IEEE student members, and product enthusiasts.',
    chiefGuestsText:
      'Dr. M. H. Kori (Executive Board Member, SAGE) | Senior IEEE Bangalore Section Dignitaries | Ramaiah Institute of Technology Faculty Heads & Coordinators',
    agenda: [
      { time: '14:00', title: 'Welcome & Dignitary Reception', speaker: 'Student Coordinators & IEEE Volunteers', tag: 'Welcome' },
      { time: '14:30', title: 'Prototype Showcase & Design Evaluation', speaker: 'Design Challenge Finalists', tag: 'Exhibition' },
      { time: '15:15', title: 'Keynote Address on Design in Engineering', speaker: 'Dr. M. H. Kori (SAGE Board Member)', tag: 'Keynote' },
      { time: '16:00', title: 'Guest of Honour Address', speaker: 'Senior IEEE Bangalore Section Dignitary', tag: 'Address' },
      { time: '16:45', title: 'Prize Distribution & Winner Felicitation', speaker: 'Dignitaries & Jury Panel', tag: 'Awards' },
      { time: '17:30', title: 'Closing Remarks & High Tea Networking', speaker: 'Organizing Committee', tag: 'Networking' },
    ],
    speakers: [
      { name: 'Dr. M. H. Kori', role: 'Executive Board Member, SAGE', bio: 'Former Technical Director, Alcatel-Lucent Technologies | Senior IEEE Fellow' },
      { name: 'Senior IEEE Dignitary', role: 'Guest of Honour', bio: 'IEEE Bangalore Section / MTT-S Chapter Representative' },
      { name: 'Ramaiah IT Faculty Chairs', role: 'Organizing Partners', bio: 'Department of Electronics & Communication / Computer Science, Ramaiah Institute of Technology' },
      { name: 'SAGE Design Jury', role: 'Design Evaluators', bio: 'Shastry Associates Global Enterprises' },
    ],
    resources: [
      { title: 'SAGE UI/UX Design Challenge Catalog', meta: 'PDF • 2.4 MB', downloadUrl: '/contact' },
      { title: 'Awards Ceremony Presentation', meta: 'PDF • 1.6 MB', downloadUrl: '/contact' },
    ],
    image: '/events/ui-ux/cover.jpg',
    gallery: [
      '/events/ui-ux/gallery/1.jpg',
      '/events/ui-ux/gallery/2.jpg',
      '/events/ui-ux/gallery/3.jpg',
      '/events/ui-ux/gallery/4.jpg',
      '/events/ui-ux/gallery/5.jpg',
    ],
  },
  {
    id: 'sage-symposium',
    title: 'First SAGE International Symposium on Advances in Wireless Technologies',
    badge: 'Inaugural Symposium',
    date: '2024-08-10',
    location: 'Prestige Falcon Tower, Bengaluru',
    venueDetails: 'Prestige Falcon Tower, 19 Brunton Road, Bengaluru',
    scheduleTime: '9:30 AM – 5:00 PM',
    duration: '1 Day',
    participants: '100+',
    certificates: 'Distributed',
    statusText: 'Completed',
    type: 'seminar',
    description:
      'The First SAGE International Symposium on Advances in Wireless Technologies brings together leading researchers, academicians, and industry experts to discuss emerging trends in 5G, 6G, RF systems, microwave engineering, and semiconductor technologies.',
    aboutText:
      'The First SAGE International Symposium on Advances in Wireless Technologies brings together leading researchers, academicians, and industry experts to discuss emerging trends in 5G, 6G, RF systems, microwave engineering, and semiconductor technologies. The symposium focuses on translating advanced research into real-world products and next-generation communication systems.',
    highlights: [
      'Evolution from 5G to 6G communication systems',
      'RF, microwave, and millimeter-wave technologies',
      'Semiconductor and SoC design challenges',
      'Industry–academia collaboration and innovation',
      'Unique cultural program: Mooshikaa Katha – String Puppet Show by Dhaatu Puppet Theater',
      'Student–Industry interactive networking session',
    ],
    whoShouldAttend:
      'Academicians and researchers | Industry professionals | Students of Electronics, Communication and allied disciplines | Entrepreneurs | Anyone interested in India\'s technology and innovation ecosystem.',
    chiefGuestsText:
      'Dr. Prasad Shastry | Dr. K. D. Nayak | Dr. Surendra Pal | Prof. V. Mahadevan | Dr. M. H. Kori',
    agenda: [
      { time: '12:55 – 1:40 PM', title: 'Advancing from 5G to 6G: The Future Connectivity', speaker: 'Dr. Kiran Kuchi, Professor, IIT Hyderabad', tag: 'Technical Talk' },
      { time: '1:40 – 2:25 PM', title: 'Lunch', speaker: '', tag: 'Break' },
      { time: '2:30 – 3:15 PM', title: 'RF Energy Harvesting: Methodologies, Challenges and Current Activities at IIT Kanpur', speaker: 'Dr. Jaleel Akhtar, Professor, IIT Kanpur', tag: 'Technical Talk' },
      { time: '3:15 – 4:00 PM', title: 'Efficiency Enhancements using Digital Pre-distortion and Supply Modulated Amplifiers', speaker: 'Dr. Paul Draxler, Vice President of Technology, Eridan, U.S.A', tag: 'Industry Talk' },
      { time: '4:00 – 4:20 PM', title: 'Coffee Break', speaker: '', tag: 'Break' },
      { time: '4:20 – 5:05 PM', title: 'The 4 C\'s to Design State of the Art SoCs', speaker: 'Ms. Deb Dendy, Chief Operating Officer, Macklin Connection, U.S.A', tag: 'Industry Talk' },
      { time: '5:05 – 5:35 PM', title: 'Concluding Remarks & Vote of Thanks', speaker: 'Organizing Committee', tag: 'Closing' },
      { time: '5:35 – 7:00 PM', title: 'High Tea, Networking & Student–Industry Interactive Session', speaker: 'All Delegates', tag: 'Networking' },
      { time: '7:00 – 7:50 PM', title: 'Mooshikaa Katha – String Puppet Show', speaker: 'Dhaatu Puppet Theater | Directed by Padmashri awardee Mrs. Anupama Hoskere', tag: 'Cultural Program' },
      { time: '7:50 – 8:00 PM', title: 'Vote of Thanks', speaker: 'Organizing Committee', tag: 'Closing' },
      { time: '8:00 – 9:00 PM', title: 'Dinner', speaker: 'All Delegates', tag: 'Dinner' },
    ],
    speakers: [
      { name: 'Dr. Kiran Kuchi', role: 'Professor, IIT Hyderabad', bio: 'Talk: "Advancing from 5G to 6G: The Future Connectivity"' },
      { name: 'Dr. Jaleel Akhtar', role: 'Professor, IIT Kanpur', bio: 'Talk: "RF Energy Harvesting: Methodologies, Challenges and Current Activities at IIT Kanpur"' },
      { name: 'Dr. Paul Draxler', role: 'Vice President of Technology, Eridan, U.S.A', bio: 'Talk: "Efficiency Enhancements using Digital Pre-distortion and Supply Modulated Amplifiers"' },
      { name: 'Ms. Deb Dendy', role: 'Chief Operating Officer, Macklin Connection, U.S.A', bio: 'Talk: "The 4 C\'s to Design State of the Art SoCs"' },
    ],
    image: '/events/sage-symposium/cover.jpg',
    gallery: [
      '/events/sage-symposium/gallery/1.jpg',
      '/events/sage-symposium/gallery/2.jpg',
      '/events/sage-symposium/gallery/3.jpg',
      '/events/sage-symposium/gallery/4.jpg',
    ],
  },
  {
    id: 'sage-inauguration',
    title: 'SAGE Grand Inauguration Ceremony',
    badge: 'Foundation Launch',
    date: '2024-08-10',
    location: 'Prestige Falcon Tower, Bengaluru',
    venueDetails: 'Prestige Falcon Tower, 19 Brunton Road, Bengaluru',
    scheduleTime: '9:30 AM – 5:00 PM',
    duration: '1 Day',
    participants: '100+',
    certificates: 'Distributed',
    statusText: 'Completed',
    type: 'seminar',
    description:
      'The SAGE Inauguration marks the formal launch of Shastry Associates Global Enterprises (SAGE), bringing together eminent leaders from academia, industry, and research.',
    aboutText:
      'The SAGE Inauguration marks the formal launch of Shastry Associates Global Enterprises (SAGE), bringing together eminent leaders from academia, industry, and research. The event celebrates the vision of SAGE to advance innovation, collaboration, and knowledge-sharing in wireless, RF, and advanced communication technologies.',
    highlights: [
      'Vision and mission of Shastry Associates Global Enterprises (SAGE)',
      'Insights into India\'s technology and product ecosystem',
      'Perspectives on future wireless and communication technologies',
      'Interaction with distinguished leaders from ISRO, industry, and academia',
      'Networking opportunities with professionals, faculty, and students',
    ],
    whoShouldAttend:
      'Academicians and researchers | Industry professionals | Students of Electronics, Communication and allied disciplines | Entrepreneurs | Anyone interested in India\'s technology and innovation ecosystem.',
    chiefGuestsText:
      'Mr. A. S. Kiran Kumar (Former Secretary, Department of Space) | Mr. Sanjay Nayak (Co-Founder & Former CEO, Tejas Networks)',
    agenda: [
      { time: '09:30 – 10:40', title: 'Registration & Meet and Greet Over Coffee', speaker: 'Organizing Committee', tag: 'Registration' },
      { time: '10:45 – 11:45', title: 'SAGE Inauguration Ceremony', speaker: 'Inauguration of Shastry Associates Global Enterprises (SAGE)', tag: 'Ceremony' },
      { time: '11:45 – 12:10', title: 'Inauguration Speech', speaker: 'Mr. A. S. Kiran Kumar, Former Secretary, Department of Space | Former Chairman, Space Commission', tag: 'Chief Guest Address' },
      { time: '12:10 – 12:55', title: 'Keynote: Opportunities and Challenges for India to become a Technology Product Nation', speaker: 'Mr. Sanjay Nayak, Co-Founder & Former CEO, Tejas Networks', tag: 'Keynote' },
    ],
    speakers: [
      { name: 'Mr. A. S. Kiran Kumar', role: 'Chief Guest – Inauguration Speech', bio: 'Former Secretary, Department of Space | Former Chairman, Space Commission' },
      { name: 'Mr. Sanjay Nayak', role: 'Keynote Address', bio: 'Co-Founder & Former CEO, Tejas Networks | Talk: "Opportunities and Challenges for India to become a Technology Product Nation"' },
    ],
    image: '/events/sage-inauguration/cover.jpg',
    gallery: [
      '/events/sage-inauguration/gallery/1.jpg',
      '/events/sage-inauguration/gallery/2.jpg',
      '/events/sage-inauguration/gallery/3.jpg',
      '/events/sage-inauguration/gallery/4.jpg',
    ],
  },
];

export const eventsData: SageEvent[] = events;

export function getEvents(): SageEvent[] {
  return events;
}

export function getUpcomingEvents(): SageEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(): SageEvent[] {
  const today = new Date().toISOString().split('T')[0];
  return events
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

