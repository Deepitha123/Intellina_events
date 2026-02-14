const events = {
  /* ===================== TECHNICAL EVENTS ===================== */
  technical: {
    "paper-presentation": {
      id: 1,
      title: "PAPER PRESENTATION",
      category: "technical",
      description:
        "Paper Presentation provides a scholarly platform for participants to present innovative research ideas and technical concepts. It encourages analytical thinking, structured communication, and academic excellence by allowing students to defend their work before an expert panel.",
      day: "Mar 6",
      time: "10.00 am to 5.00 pm",
      teamSize: "Team of 4",
      prizes: "5,000",
      image: "/assets/events/images/paperpresentation.jpg",
      poster: "/assets/events/posters/paperpresentation.png"
    },

    hackathon: {
      id: 2,
      title: "HACKATHON",
      category: "technical",
      description:
        "Hackathon is an intense innovation sprint where teams collaborate to design, develop, and deliver impactful solutions within a limited time frame. Participants transform ideas into functional prototypes while showcasing creativity, problem-solving skills, and technical expertise.",
      day: "Mar 6",
      time: "10.00 am to 5.00 pm",
      teamSize: "Team of 4",
      prizes: "25,000",
      image: "/assets/events/images/Hackathon.jpeg",
      poster: "/assets/events/posters/Hackathon.png"
    },

    rrr: {
      id: 3,
      title: "RRR – RUN RUN RUN",
      category: "technical",
      description:
        "RRR is a fast-paced coding challenge designed to test participants’ debugging accuracy, logical thinking, and coding efficiency under strict time constraints.",
      day: "Mar 6",
      time: "10.30 am to 3.00 pm",
      teamSize: "Solo",
      prizes: "5,000",
      image: "/assets/events/images/RRR.jpeg",
      poster: "/assets/events/posters/RRR.png"
    },

    "worst-ui": {
      id: 4,
      title: "WORST UI DESIGN",
      category: "technical",
      description:
        "Worst UI Design flips traditional design principles by challenging participants to create the most confusing yet functional interface. The event highlights the importance of good UX through intentionally poor usability.",
      day: "Mar 7",
      time: "11.00 am to 2.00 pm",
      teamSize: "Team of 4",
      prizes: "5,000",
      image: "/assets/events/images/WorstUI.jpeg",
      poster: "/assets/events/posters/WorstUi.png"
    },

    "web-design": {
      id: 5,
      title: "WEB DESIGN",
      category: "technical",
      description:
        "Web Design challenges participants to build visually appealing, fully responsive websites from scratch, focusing on creativity, usability, and originality without templates.",
      day: "Mar 7",
      time: "11.00 am to 2.00 pm",
      teamSize: "Team of 4",
      prizes: "5,000",
      image: "/assets/events/images/WebDesign.jpeg",
      poster: "/assets/events/posters/WebDesign.png"
    },

    "project-expo": {
      id: 6,
      title: "PROJECT EXPO",
      category: "technical",
      description:
        "Project Expo is a grand showcase of innovation where participants present working models, prototypes, and research projects that demonstrate real-world impact and engineering excellence.",
      day: "Mar 7",
      time: "9.00 am to 12.00 pm",
      teamSize: "Team of 3-4",
      prizes: "8,000",
      image: "/assets/events/images/ProjectExpo.jpeg",
      poster: "/assets/events/posters/ProjectExpo.png"
    }
  },

  /* ===================== FLAGSHIP EVENTS ===================== */
  flagship: {
    gptathon: {
      id: 7,
      title: "GPT-ATHON",
      category: "flagship",
      description:
        "GPT-athon is a flagship AI competition focused on prompt engineering. Participants craft powerful prompts to generate high-quality, creative, and accurate responses from AI models.",
      day: "Mar 6",
      time: "10.30 am to 1.30 pm",
      teamSize: "Team of 4",
      prizes: "8,000",
      image: "/assets/events/images/GPTathon.jpeg",
      poster: "/assets/events/posters/GPTathon.png"
    },

    "rapid-chess": {
      id: 19,
      title: "RAPID CHESS",
      category: "flagship",
      description:
        "Test your strategic thinking and speed in our Rapid Chess tournament. Compete against top players in intense timed matches.",
      day: "Mar 6",
      time: "2.00 pm to 5.00 pm",
      teamSize: "Solo",
      prizes: "As per announcement",
      image: "/assets/events/images/RapidChess.jpeg",
      poster: "/assets/events/posters/RapidChess.png"
    },

    "object-odyssey": {
      id: 17,
      title: "OBJECT ODYSSEY",
      category: "flagship",
      description:
        "Object Odyssey is a thrilling scavenger hunt that tests observation skills, quick thinking, and the ability to spot hidden objects in complex environments. Participants race to find specific items before time runs out.",
      day: "Mar 6",
      time: "3.00 pm to 5.00 pm",
      teamSize: "Solo / Team (max 3)",
      prizes: "1,500",
      image: "/assets/events/images/ObjectOdyssey.jpeg",
      poster: "/assets/events/posters/OBJECTODYSSEY.png"
    },

    esports: {
      id: 9,
      title: "E-SPORTS",
      category: "flagship",
      description:
        "eSports brings competitive gaming to the spotlight, where participants battle in virtual arenas using strategy, reflexes, and teamwork.",
      day: "Mar 6",
      time: "TBA",
      teamSize: "Solo / Team",
      prizes: "7,000",
      image: "/assets/events/images/E-sports.jpeg",
      poster: "/assets/events/posters/E-Sports.png"
    }
  },

  /* ===================== NON-TECH EVENTS ===================== */
  "non-tech": {
    bigboss: {
      id: 11,
      title: "BIGG BOSS",
      category: "non-tech",
      description:
        "Bigg Boss is a reality-style elimination game filled with fun tasks, puzzles, strategy, and unexpected twists. Only the smartest survivor wins.",
      day: "Mar 6",
      time: "2.00 pm to 5.00 pm",
      teamSize: "Solo",
      prizes: "3,500",
      image: "/assets/events/images/Biggboss.jpeg",
      poster: "/assets/events/posters/BiggBoss.png"
    },

    "ipl-auction": {
      id: 15,
      title: "IPL AUCTION",
      category: "non-tech",
      description:
        "IPL Auction simulates the excitement of a professional cricket auction, challenging teams to strategically bid and build a balanced squad.",
      day: "Mar 7",
      time: "9.00 am",
      teamSize: "Team of 3-4",
      prizes: "3,000",
      image: "/assets/events/images/IPLAuction.jpeg",
      poster: "/assets/events/posters/IPLAuction.png"
    },

    "treasure-hunt": {
      id: 16,
      title: "TREASURE HUNT",
      category: "non-tech",
      description:
        "Treasure Hunt is an adventurous team challenge where clues are solved sequentially to uncover hidden treasures.",
      day: "Mar 6",
      time: "11.00 am to 3.00 pm",
      teamSize: "Team of 4",
      prizes: "4,000",
      image: "/assets/events/images/TreasureHunt.jpeg",
      poster: "/assets/events/posters/TreasureHunt.png"
    },

    connections: {
      id: 13,
      title: "CONNECTIONS",
      category: "non-tech",
      description:
        "Connections is a logic-driven event where participants identify hidden patterns and relationships between seemingly unrelated elements.",
      day: "Mar 7",
      time: "9.00 am to 12.00 pm",
      teamSize: "Solo",
      prizes: "2,500",
      image: "/assets/events/images/Connections.jpeg",
      poster: "/assets/events/posters/Connections.png"
    },

    "murder-mystery": {
      id: 14,
      title: "MURDER MYSTERY",
      category: "non-tech",
      description:
        "Murder Mystery immerses participants in a thrilling investigation where clues must be analyzed and secrets uncovered before time runs out.",
      day: "Mar 6",
      time: "3.00 pm to 5.00 pm",
      teamSize: "Team",
      prizes: "2,500",
      image: "/assets/events/images/Murder-Mystery.jpeg",
      poster: "/assets/events/posters/MurderMystery.png"
    },

    "snap-sense": {
      id: 18,
      title: "SNAP SENSE",
      category: "non-tech",
      description:
        "Snap Sense challenges participants to capture the perfect moment through photography based on given themes. It tests creativity, timing, and the ability to tell stories through visual composition.",
      day: "Mar 7",
      time: "11.00 am to 2.00 pm",
      teamSize: "Solo",
      prizes: "2,500",
      image: "/assets/events/images/SnapSense.jpeg",
      poster: "/assets/events/posters/SNAPSENSE.png"
    }
  }
};

// Flatten for the dice roller with integrated slugs
const flattenedEvents = [
  ...Object.entries(events.technical).map(([slug, event]) => ({ ...event, slug })),
  ...Object.entries(events.flagship).map(([slug, event]) => ({ ...event, slug })),
  ...Object.entries(events["non-tech"]).map(([slug, event]) => ({ ...event, slug }))
];


export const eventsData = events;
export default flattenedEvents;
