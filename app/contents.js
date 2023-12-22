import html from "choo/html";
var sc = [
  {
    start: new Date("December 18, 2023"),
    title: "Palallel",
    type: ["publication"],
    topic: ["html"],
    venue: "Taper #11",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/palallel.png?v=1703226169391",
    collab: ["Naoto Hieda"],
    links: ["https://taper.badquar.to/11/palallel.html"],
    desc: html`<div>
      “Palallel” is generative, visual poetry around geometry, concurrence
      and the word parallel itself. A pair of two “parallel” text lines
      rewrites the dictionary definition of "parallel" by themselves,
      in “parallel” to the other pair. While the visual aspect is prominent,
      the poetry suggests different languages and cultures (English and
      Japanese in this case) exist in parallel and challenges how browsers
      render different languages. The title came from a common mistake by
      Japanese people mixing up r and l consonants. <br />
      Published by Bad Quarto
    </div>`
  },
  {
    start: new Date("December 14, 2023"),
    title: "I MISS MY PRE INTERNET-BRAIN",
    type: ["performance"],
    topic: [],
    collab: ["Anastasiia Pishchanska"],
    venue: "Tama Art University (Japan)",
    image: "https://cdn.glitch.global/3270db08-a907-4d35-b607-28d9297445c9/411929223_1266106421443644_6534368842755878499_n.jpg?v=1703224828126",
    links: ["https://bootywithoutorgans.glitch.me/"],
    desc: html`
    Techncial direction: Naoto Hieda
    `
  },
  {
    start: new Date("December 7, 2023"),
    title: "Open House",
    type: ["performance"],
    topic: [],
    collab: ["Jorge Guevara"],
    venue: "Academy for Theater and Digitality (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/jorge-openhouse.jpg?v=1703226126321",
    links: [],
    desc: html`
    Mentor: Naoto Hieda
    `
  },
  {
    start: new Date("November 22, 2023"),
    title: "Naoto's Presentation",
    type: ["lecture"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Tokyo University of the Arts (Japan)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/amc2.png?v=1703226010462",
    links: [],
    desc: html`
    `
  },
  {
    start: new Date("November 4, 2023"),
    title: "cctv.glitches.me",
    type: ["installation"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "FIfFKon (Germany)",
    // image: "https://img.glitches.me/images/2023/09/11/339C8DCF-67BC-4A08-8972-2860764505FA.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: new Date("November 4, 2023"),
    title: "Aesthetic approaches to cyber peace work",
    type: ["lecture"],
    topic: [],
    collab: ["Ground Zero"],
    venue: "FIfFKon (Germany)",
    // image: "https://img.glitches.me/images/2023/09/11/339C8DCF-67BC-4A08-8972-2860764505FA.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: new Date("October 29, 2023"),
    title: "Unarchiving Dance",
    type: ["workshop"],
    topic: [],
    collab: ["Naoto Hieda", "Tobias Hartmann"],
    venue: "Annual symposium of the Society for Dance Research (Germany)",
    // image: "https://img.glitches.me/images/2023/09/11/339C8DCF-67BC-4A08-8972-2860764505FA.jpg",
    links: ["https://www.gtf-tanzforschung.de/en/convention/symposium-2023/"],
    desc: html`
    `
  },
  {
    start: new Date("October 27, 2023"),
    title: "Exhibition: Code, Remix, Break & Glitch",
    type: ["installation"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Digitale Welten / TOR Art Space (Germany)",
    image: "https://img.glitches.me/images/2023/10/28/A9D20F93-BC08-42FC-8095-78A45D64BBDA.md.jpg",
    links: ["https://www.digitale-welten.org/"],
    desc: html`
    `
  },
  {
    start: new Date("October 23, 2023"),
    title: "Workshop: Code, Remix, Break & Glitch",
    type: ["workshop"],
    topic: [],
    collab: ["Naoto Hieda", "Franka Osthoff"],
    venue: "Digitale Welten (Germany)",
    // image: "https://img.glitches.me/images/2023/09/11/339C8DCF-67BC-4A08-8972-2860764505FA.jpg",
    links: ["https://www.digitale-welten.org/"],
    desc: html`
    `
  },
  {
    start: new Date("October 11, 2023"),
    title: "Heartbreak Cards",
    type: ["installation", "publication"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Working Group for Unusual Input and Output Media / LUX Pavillon (Germany)",
    image: "https://img.glitches.me/images/2023/10/31/IMG_3702-1280.jpg",
    links: ["https://nodeforum.org/announcements/re-coding-everyday-technology/", "https://re-coding.technology/"],
    desc: html`
    `
  },
  {
    start: new Date("September 6, 2023"),
    title: "Bühne der Stille 2.0",
    type: ["installation"],
    topic: [],
    collab: ["Freiversum"],
    venue: "Teo Otto Theater der Remscheid (Germany)",
    image: "https://img.glitches.me/images/2023/09/11/339C8DCF-67BC-4A08-8972-2860764505FA.jpg",
    links: ["https://freiversum.com"],
    desc: html`
    Naoto Hieda: web interaction programming
    `
  },
  {
    start: new Date("August 24, 2023"),
    title: "Show You My Screen",
    type: ["performance", "net art"],
    topic: [],
    collab: ["Takeshi Mukai", "Naoto Hieda"],
    venue: "showusyourscreens (Germany)",
    links: [],
    desc: html`
    `
  },
  {
    start: new Date("August 12, 2023"),
    title: "Biosensing and Sound",
    type: ["performance", "workshop", "residency"],
    topic: ["eeg"],
    collab: ["Naoto Hieda"],
    venue: "Klanginseln Großharthau (Germany)",
    image: "https://img.glitches.me/images/2023/08/14/photo1691939602.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: new Date("August 2, 2023"),
    title: "Dynamic Memory Lab",
    type: ["installation"],
    topic: ["web"],
    collab: ["Coalition for Pluralistic Public Discourse"],
    venue: "Grünen Salon der Volksbühne (Germany)",
    image: "https://img.glitches.me/images/2023/08/14/652F71DF-882C-4C23-94B8-4B24ADE76BA0_1_105_c.md.jpg",
    links: ["https://www.dialogueperspectives.org/blog/dynamic-memory-lab/"],
    desc: html`
    Naoto Hieda: Software development
    `
  },
  {
    start: new Date("July 19, 2023"),
    title: "New Banner",
    type: ["installation"],
    topic: ["hydra"],
    collab: ["Naoto Hieda"],
    venue: "KHM Rundgang (Germany)",
    image: "https://img.glitches.me/images/2023/07/26/naoto-new-banner.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: new Date("July 19, 2023"),
    title: "Naoto's Nail Salon",
    type: ["performance"],
    topic: ["nail polish"],
    collab: ["Naoto Hieda"],
    venue: "KHM Rundgang (Germany)",
    image: "https://img.glitches.me/images/2023/07/26/20230722_KHM_RundgangDSC_0739_c_Doerthe_Boxberg_sq.jpg",
    links: ["https://nail.glitches.me/"],
    desc: html`
    `
  },
  {
    start: new Date("July 19, 2023"),
    title: "[[open-lab]]",
    type: ["installation"],
    topic: ["material"],
    collab: ["exMedia Lab"],
    venue: "KHM Rundgang (Germany)",
    image: "https://img.glitches.me/images/2023/07/26/cards_sq.jpg",
    links: ["https://open-lab.glitch.me/"],
    desc: html`
    group show with open lab seminar
    `
  },
  {
    start: new Date("June 14, 2023"),
    title: "Show You My Screen",
    type: ["net art"],
    topic: ["web"],
    collab: ["Naoto Hieda"],
    venue: "showusyourscreens (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/2023-06-14-syms.jpg?v=1687102224701",
    links: ["https://www.youtube.com/watch?v=rQzWtLS43mc"],
    desc: html`
    `
  },
  {
    start: new Date("June 9, 2023"),
    title: "Naoto's Nails",
    type: ["net art"],
    topic: ["face filter"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/IMG_0138.JPG?v=1687101951097",
    desc: html`
    `
  },
  {
    start: new Date("June 6, 2023"),
    title: "Naoto's Nail Salon",
    type: ["performance"],
    topic: ["nails"],
    collab: ["Naoto Hieda"],
    venue: "KHM (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/2023-06-06-nail-salon-flyer.gif?v=1687099506801",
    desc: html`
    `
  },
  {
    start: new Date("May 24, 2023"),
    title: "UrbanRecall-Archive",
    type: ["net art"],
    topic: ["archive"],
    collab: ["UrbanRecall"],
    venue: "KoProduktionsLabor (Germany)",
    image: "https://img.glitches.me/images/2023/07/31/Screenshot-2023-07-31-at-09-58-02-urbanrecall_web_archive.png",
    links: ["https://github.com/Koproduktionslabor/UrbanRecall-Archive"],
    desc: html`
    `
  },
  {
    start: new Date("May 8, 2023"),
    title: "Digital Corporealities",
    type: ["lecture"],
    topic: ["dance", "digitality"],
    collab: ["Naoto Hieda"],
    venue: "PACT Zollverein (Germany)",
    image: "https://img.glitches.me/images/2023/05/19/2023-05-08-pact.jpg",
    links: ["https://nosy-phrygian-twister.glitch.me/",
            "https://abiding-simple-inspiration.glitch.me/"],
    desc: html`
    `
  },
  {
    start: new Date("May 7, 2023"),
    title: "Neuroqueerness and Decolonization in Media Art",
    type: ["publication"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/thesis.jpg?v=1695584746655",
    links: ["https://neuroqueer.glitch.me/"],
    desc: html`
    `
  },
  {
    start: new Date("April 22, 2023"),
    title: "Hands-On: Introduction to Live-Coding with Hydra",
    type: ["workshop"],
    topic: [""],
    collab: ["Naoto Hieda"],
    venue: "Hauptsache Frei (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/photo1682454956.jpeg?v=1683810904398",
    links: ["https://hydra-hauptsachefrei-2023-workshop.glitch.me/"],
    desc: html`Photo: Bente Stachowske
    `
  },
  {
    start: new Date("April 19, 2023"),
    title: "Speculation Unit",
    type: ["workshop"],
    topic: [""],
    collab: ["elisELIS", "Shahrzad Nazarpour", "Tam Thi Pham", "Sarah Fartuun Heinze", "Sarah Wenzinger", "Jeremy Bailey", "Naoto Hieda", "Jeanne Charlotte Vogt"],
    venue: "Hauptsache Frei (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/20230422_190312.jpg?v=1683811224662",
    links: ["https://aromatic-luminous-chicken.glitch.me/"],
    desc: html`
    `
  },
  {
    start: new Date("March 4, 2023"),
    title: "solo.glitches.me",
    type: ["performance"],
    topic: ["net art"],
    collab: ["Naoto Hieda"],
    venue: "#TakeMoreCare (Germany)",
    image: "https://bild.glitches.me/images/2023/03/09/wannacomecloser_naoto.md.jpg",
    desc: html`
    `
  },
  {
    start: new Date("March 1, 2023"),
    title: "soup.glitches.me",
    type: ["installation"],
    topic: ["net art"],
    collab: ["Naoto Hieda"],
    venue: "Freiraum (Germany)",
    image: "https://bild.glitches.me/images/2023/03/03/4CCFE8FB-180D-462A-A43F-0050132863A2.md.jpg",
    links: ["https://www.benjriepe.com/in-progress/freiraum-digital/"],
    desc: html`
    `
  },
  {
    start: new Date("February 17, 2023"),
    title: "festival.naotohieda.com",
    type: ["performance", "installation"],
    topic: ["body", "dance"],
    collab: ["Naoto Hieda"],
    venue: "Teatro de Garaje (Colombia)",
    image: "https://bild.glitches.me/images/2023/02/17/AD5CFFAC-99B4-4E8E-B06F-565B85A2EEDF.md.jpg",
    links: ["https://festival.naotohieda.com/"],
    desc: html`
    `
  },
  {
    start: new Date("November 29, 2022"),
    title: "solo.glitches.me",
    type: ["performance"],
    topic: ["body", "dance"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://bild.glitches.me/images/2022/11/27/mitav-naoto-poster.png",
    links: ["https://solo.glitches.me/"],
    desc: html`
    `
  },
  {
    start: new Date("November 8, 2022"),
    title: "solo.glitches.me",
    type: ["performance"],
    topic: ["body", "dance"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/Screenshot%202022-11-10%20at%2011-50-59%202022%2011%2008%20Solo.png?v=1668099073252",
    yt: "B7vzLTwjzTM",
    desc: html`
    `
  },
  {
    start: new Date("November 4, 2022"),
    title: "Lulogear",
    type: ["installation"],
    topic: ["processing", "lithography"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://bild.glitches.me/images/2022/11/05/IMG_4392.jpg",
    desc: html`
    `
  },
  {
    start: new Date("October 17, 2022"),
    title: "Glitch me on glitch me",
    type: ["installation", "net art"],
    topic: ["hydra", "livelab"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Festival de la Imagen (Colombia)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/IMG_3869.JPG?v=1667690441654",
    desc: html`
    `
  },
  {
    start: new Date("October 11, 2022"),
    title: "solo.glitches.me",
    type: ["performance"],
    topic: ["body", "language"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/solo.jpg?v=1667690772642",
    yt: "Zov0zYYLDwQ",
    desc: html`
    `
  },
  {
    start: new Date("September 23, 2022"),
    title: "Granadilla-Croissant",
    type: ["installation"],
    topic: ["hydra", "lithography"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/2022-09-23-IMG_3145.jpg?v=1667690523635",
    desc: html`
    `
  },
  {
    start: new Date("August 8, 2022"),
    title: "Exchange at Maestría interdisciplinar en Teatro y Artes vivas",
    type: ["residency"],
    topic: ["body", "language"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://img.glitches.me/images/2022/09/12/IMG_2335.jpg",
    desc: html`
    `
  },
  {
    start: new Date("July 12, 2022"),
    title: "Best Practices Workshop",
    type: ["workshop"],
    topic: ["hydra", "livelab"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "PerformingArtsForum (France)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/Screenshot%202022-11-10%20at%2011-47-42%202022%2007%2012%20Best%20Practices%20Workshop%20(Participants%20at%20PAF%20%40Jorge%20Guevara%20%26%20Naoto%20Hieda).png?v=1668098896237",
    desc: html`
    `
  },
  {
    start: new Date("June 26, 2022"),
    title: "Best Practices Workshop",
    type: ["workshop"],
    topic: ["hydra", "livelab"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "Hauptsache Frei (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/3419B84D-C89F-460E-B646-26F6E3FF4621.jpeg?v=1668098470397",
    desc: html`
    Workshop and presentation in the frame of Beyond Digital Lab<br />
    Photo by Jeanne Charlotte Vogt
    `
  },
  {
    start: new Date("June 24, 2022"),
    title: "OpenLab",
    type: ["performance"],
    topic: ["hydra", "livelab"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Academy for Theater and Digitality (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/openlab.png?v=1667690004142",
    desc: html`
    `
  },
  {
    start: new Date("June 21, 2022"),
    title: "Science Kitchen: Decompositions of algorithms and glitched worlds",
    type: ["lecture"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "KHM exMedia Lab (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/scikitchen.jpg?v=1667690001577",
    links: ["https://exmedia.khm.de/science-kitchen-decompositions-of-algorithms-and-glitched-worlds/"],
    desc: html`
    Invited and organized by Karin Lingnau and Jaqueline Hen
    `
  },
  {
    start: new Date("June 17, 2022"),
    title: "Live Coding Performance",
    type: ["performance"],
    topic: ["tidalcycles", "hydra"],
    collab: ["Flor de Fuego", "Alexandra Cárdenas"],
    venue: "Werk (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/werkperformance.jpg?v=1667689999845",
    desc: html`
    Camera footage by Naoto Hieda
    `
  },
  {
    start: new Date("June 11, 2022"),
    title: "Hydra in the Dome",
    type: ["workshop"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Dortmunder U (Germany)",
    image:
      "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/domeworkshop.jpg?v=1667689998296",
    desc: html`
    Supported by Academy for Theater and Digitality and StoryLab kiU
    `
  },
  {
    start: new Date("June 4, 2022"),
    title: "GlitchMe3D at Time Window",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Terror Kittens", "Naoto Hieda"],
    venue: "Time Window (The Netherlands)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/timewindow.jpg?v=1667689997509",
    desc: html`
    `
  },
  {
    start: new Date("May 31, 2022"),
    title: "MidTermReview",
    type: ["performance"],
    topic: ["movement"],
    collab: ["Flor de Fuego", "Jorge Guevara", "Naoto Hieda"],
    venue: "KHM (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/midtermreview.png?v=1667690024337",
    desc: html`
    Sharing in the frame of MidTermReview organized by Christian Sievers
    `
  },
  {
    start: new Date("May 12, 2022"),
    title: "Live Coding Sessions",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Jobi", "Naoto Hieda"],
    venue: "Doka (The Netherlands)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/dokaperformance.jpg?v=1667690022255",
    desc: html`
    `
  },
  {
    start: new Date("April 28, 2022"),
    title: "Leewa",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Ekheo"],
    venue: "La Gaîté Lyrique (France)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/gaitelyrique.jpg?v=1667690020125",
    desc: html`
      Video: Flor de Fuego & Naoto Hieda
    `
  },
  {
    start: new Date("March 22, 2022"),
    title: "Algorave Jam",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/algorave.png?v=1667690017911",
    desc: html`
    `
  },
  {
    start: new Date("March 11, 2022"),
    title: "Guest Lecture at Creative Coding Computing",
    type: ["lecture"],
    topic: ["community"],
    collab: ["Naoto Hieda"],
    venue: "University of the Arts London (online)",
    desc: html`
      Invited by Joana Chicau
    `
  },
  {
    start: new Date("March 10, 2022"),
    title: "riso.glitches.me",
    type: ["installation"],
    topic: ["risograph"],
    collab: ["Naoto Hieda"],
    venue: "Art Fair Tokyo 2022 (Japan)",
    image: "https://img.glitches.me/images/2022/03/15/riso_.jpg",
    desc: html`
<a href="https://riso.glitches.me/" target="_blank">riso.glitches.me</a> is an artwork consisting of risograph prints of the artist’s brain and a custom-made computer program.<br />

Image processing is applied to an MRI scan pattern of the brain, and the output is printed as 2-color risograph. The image processing is sophisticatedly designed so that the printing offset of risograph generates different shading for each print from the same set of master patterns. 
`
  },
  {
    start: new Date("March 8, 2022"),
    title: "Livecodera",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/livecodera.png?v=1667690016217",
    desc: html`
    `
  },
  {
    start: new Date("February 17, 2022"),
    title: "ICADE",
    type: ["installation"],
    topic: ["web"],
    collab: ["KHM"],
    venue: "KHM (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/icade.jpg?v=1646209286429",
    desc: html`
Atelier Netze präsentiert die Online- und Offline-Ausstellung „[  ]ICADE“ mit Arbeiten von Mary Mikaelyan, Ji Su Kang-Gatto, Jacob Höfle, Anne Arndt, Julia Maja Funke, Hyeseon Jeong, Yannick Westphal, Naoto Hieda. „[   ]ICADE“ entstand als Reaktion auf unbegründete Zensurmaßnahmen im Rahmen der universitätsübergreifenden ICADE-Ausstellung der Academy of Arts & Design der Tsinghua University, an der die Netze-Gruppe teilgenommen hatte. Online zu finden unter https://icade-test.glitch.me    `
  },
  {
    start: new Date("February 17, 2022"),
    title: "feature request: add Japanese",
    type: ["book"],
    topic: ["javascript"],
    collab: ["Naoto Hieda"],
    venue: "KHM (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/japaneseBook.jpg?v=1646209611810",
    desc: html`Photo: Doerthe Boxberg
    `
  },
  {
    start: new Date("February 11, 2022"),
    title: "#NaotoHieda",
    type: ["installation"],
    topic: ["banner", "web", "dance", "hydra"],
    collab: ["Naoto Hieda"],
    venue: "Pola Museum Annex (Japan)",
    image: "https://img.glitches.me/images/2022/02/13/banner.jpg",
    links: ["https://www.po-holdings.co.jp/m-annex/exhibition/index.html"],
    desc: html`
    #NaotoHieda is an artwork around a computer program and a body. Emerged from online collaborations since 2020 with choreographers and artists such as Jorge Guevara, Flor de Fuego, and Nien Tzu Weng, Hieda uses code as a queer expression instead of a productive tool as widely believed. A video is generated by pixel manipulation through live-painting, or live-coding to be precise, while dancing improvisationally. Its screenshot is printed as a construction banner, an ephemeral medium, to express the dynamics of code and the logic of body.<br />
<br />
Thanks to Christian Sievers, Julia Scher, Romina Dümler and Shunsuke Takawo<br />
Sponsored by Processing Community Japan (PCJ)

    `
  },
  {
    start: new Date("February 1, 2022"),
    title: "Fellowship",
    type: ["residency"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Academy for Theater and Digitality (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/fellowshipflok.png?v=1667690014399",
    desc: html`
    `
  },
  {
    start: new Date("January 6, 2022"),
    title: "#BestPracticesInContemporaryDance",
    type: ["installation"],
    topic: ["web", "dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    image: "https://cdn.glitch.global/cada0ae2-f902-428d-81e3-6a68f5e589e5/Photo%202022-01-06%2018%2045%2049.jpg?v=1641551753828",
    links: ["https://best-ux.glitch.me/", "https://tanzhaus-nrw.de/en/event/2022/01/installations"],
    desc: html`
    Concept, artistic direction: Jorge Guevara, Naoto Hieda. Dance, choreography, coding: the public.
    `
  },
  {
    start: new Date("December 17, 2021"),
    title: "Leewa",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Ekheo"],
    venue: "Hijack Crack Bellmer (Germany)",
    image: "https://cdn.glitch.me/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fvlcsnap-2021-11-18-10h55m20s617.png?v=1637200592768",
    desc: html`
      Video: Naoto Hieda
    `
  },
  {
    start: new Date("December 15, 2021"),
    title: "#bestpracticesincontemporarydance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image:
      "https://img.glitches.me/images/2021/09/29/vlcsnap-2021-09-29-08h51m47s569.jpg",
    venue: "ICLC (online)",
    links: ["https://iclc.toplap.org/2021/exhibition.html"],
    desc: html`
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: new Date("December 15, 2021"),
    title: "GlitchMe Installation",
    type: ["net art"],
    topic: ["hydra", "web"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "ICLC (online)",
    links: ["https://iclc.toplap.org/2021/exhibition.html"],
    image:
      "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2F201218-codame.jpg?v=1608479114980",
    yt: "Fas_pGA2tvk",
    desc: html`
    `
  },
  {
    start: new Date("November 20, 2021"),
    title: "Glitch Vacations",
    type: ["performance", "net art"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    image:
      "https://img.glitches.me/images/2021/09/20/vlcsnap-2021-09-20-19h11m28s562.jpg",
    yt: "d0KMUUOrUvs",
    venue: "Piksel 21 (Norway)",
    desc: html`
    Glitch Vacations is an audiovisual performance by Flor de Fuego and Naoto Hieda - a journey through open webpages and platforms created by the artists and the community members. The generative video and sound consist of minimal elements - geometric shapes and sinusoidal waves - yet the modulation and collision of each element result in complex forms, namely a glitch. In the livestream, the artists perform as navigating through web pages, which are interlinked with each other; optionally, audience members can open a provided URL to participate in an interactive experience on their browser.
    `
  },
  {
    start: new Date("November 19, 2021"),
    title: "Leewa",
    type: ["performance"],
    topic: ["web"],
    collab: ["Ekheo"],
    venue: "Conversations with Computers (Austria)",
    links: ["https://cwc.radical-openness.org/"],
    image: "https://cdn.glitch.me/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fvlcsnap-2021-11-18-10h55m20s617.png?v=1637200592768",
    desc: html`
      Video: Naoto Hieda
    `
  },
  {
    start: new Date("November 10, 2021"),
    title: "Naoto's Laptop",
    type: ["installation"],
    topic: ["hydra"],
    collab: ["Naoto Hieda"],
    venue: "Conversations with Computers (Austria)",
    links: ["https://cwc.radical-openness.org/"],
    image: "https://cdn.glitch.me/f61e9156-1be6-44f2-84b8-d6fa7844ff0e%2Fopening01.jpg?v=1636606139598",
    desc: html`
      A laptop installation and a banner
    `
  },
  {
    start: new Date("October 28, 2021"),
    title: "Empty Mind",
    type: ["performance"],
    topic: ["web"],
    collab: ["MAXLab"],
    venue: "Royal Academy of Fine Arts Antwerp (Belgium)",
    links: ["https://empty-minds.vercel.app/"],
    image: "https://empty-minds.vercel.app/assets/og.png",
    desc: html`
      Platform & UI development: Naoto Hieda
    `
  },
  {
    start: new Date("October 3, 2021"),
    title: "Circles",
    type: ["performance"],
    topic: ["web"],
    collab: ["Amir Shpilman"],
    venue: "Die Irritierte Stadt (Germany)",
    links: ["https://www.irritiertestadt.de/"],
    image: "https://cdn.glitch.me/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcircles-stuttgarter-hymnuschorknaben-c-armin-burkhardt.jpg?v=1634855769515",
    desc: html`
      Web app: Naoto Hieda<br>
      Photo credit: Armin Burkhardt
    `
  },
  {
    start: new Date("September 28, 2021"),
    title: "Best Practices in Contemporary Dance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image:
      "https://img.glitches.me/images/2021/09/29/vlcsnap-2021-09-29-08h51m47s569.jpg",
    yt: "w5qAER81o_U",
    venue: "PerformingArtsForum (France)",
    desc: html`
    #hybridperformance #003<br>
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: new Date("September 20, 2021"),
    title: "Glitch Vacations",
    type: ["performance", "net art"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    image:
      "https://img.glitches.me/images/2021/09/20/vlcsnap-2021-09-20-19h11m28s562.jpg",
    yt: "d0KMUUOrUvs",
    venue: "Creative Commons Global Summit (online)",
    desc: html`
    Glitch Vacations is an audiovisual performance by Flor de Fuego and Naoto Hieda - a journey through open webpages and platforms created by the artists and the community members. The generative video and sound consist of minimal elements - geometric shapes and sinusoidal waves - yet the modulation and collision of each element result in complex forms, namely a glitch. In the livestream, the artists perform as navigating through web pages, which are interlinked with each other; optionally, audience members can open a provided URL to participate in an interactive experience on their browser.
    `
  },
  {
    start: new Date("September 18, 2021"),
    title: "Best Practices in Contemporary Dance: Chat",
    type: ["discussion", "conference", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image:
      "https://img.glitches.me/images/2021/09/20/chat.jpg",
    yt: "JqPZBdOrVlE",
    venue: "NEW NOW (Germany)",
    desc: html`
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: new Date("August 27, 2021"),
    title: "Die Urbane. Eine HipHop Partei",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Raphael Hillebrand"],
    image:
      "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Frh.png?v=1630336603964",
    yt: "6jxm8a3hoQE",
    venue: "Dusseldorfer Schauspielhaus (Germany)",
    desc: html`Camera: Naoto Hieda
    `
  },
  {
    start: new Date("July 31, 2021"),
    title: "Best Practices in Contemporary Dance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image:
      "https://img.glitches.me/images/2021/08/01/vlcsnap-2021-08-01-13h30m13s605.jpg",
    yt: "44Oaa1MMZhc",
    venue: "IDOCDE/ImPulsTanz (Austria)",
    desc: html`
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: new Date("July 21, 2021"),
    title: "Change Your Back Lookout Point",
    type: ["installation"],
    topic: ["json"],
    venue: "Gosau (Austria)",
    collab: ["Naoto Hieda"],
    // image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Fnbaustelle.jpg?v=1625779632657",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FIMG_7631.jpg?v=1628102343861",
    desc: html`Exhibition design: Rosi Grillmair`
  },
  {
    start: new Date("July 21, 2021"),
    title: "Silicon Friend Camp",
    type: ["residency"],
    topic: ["net art"],
    venue: "servus.at (Austria)",
    collab: ["Silicon Friends"],
    // image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Fnbaustelle.jpg?v=1625779632657",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsebastian-avatars2.jpeg?v=1627824868766",
    links: ["https://cwc.radical-openness.org/siliconfriendcamp/"],
    desc: html``
  },
  {
    start: new Date("July 21, 2021"),
    title: "Best Practices in Under Construction",
    type: ["installation"],
    topic: ["hydra", "dance"],
    venue: "KHM Open",
    collab: ["Naoto Hieda", "Jorge Guevara"],
    // image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Fnbaustelle.jpg?v=1625779632657",
    image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Funderconstruction.jpg?v=1627822787268",
    links: ["http://khmn.khm.de"],
    desc: html`Naoto Hieda and Jorge Guevara have been practicing over a year, and for the first #bestpracticesincontemporarydance exhibition, they installed a triptych of their practice featuring variety of #underconstruction gifs in a construction site.`
  },
  {
    start: new Date("July 21, 2021"),
    title: "netze.khm.de",
    type: ["net art"],
    topic: ["discord"],
    venue: "KHM Open",
    collab: ["Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/07/09/imagecd997762728c4992.png",
    links: ["http://netze.khm.de"],
    desc: html`The poems, pictures and films are a collection of artworks electronically posted on Netze Discord, which is open for any artist to participate. Since the curatorial team is taking a vacation and failed to deliver meticulously selected artworks, all the latest artworks on Discord are indiscriminately exhibited in the gallery below and updated in real time by a competent bot.`
  },
  {
    start: new Date("June 25, 2021"),
    title: "Lads",
    type: ["installation"],
    topic: ["dance", "openFrameworks", "max"],
    collab: ["Christopher Matthews"],
    venue: "Sadler's Wells Theater",
    links: ["https://www.sadlerswells.com/whats-on/2021/wild-card-christopher-matthews-formed-view-my-bodys-an-exhibition/"],
    desc: html`
      Sound programming: Naoto Hieda
    `
  },
  {
    start: new Date("June 21, 2021"),
    title: "Six Small Sketches",
    type: ["publication"],
    topic: ["hydra", "html"],
    venue: "Taper #6",
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Findex.png?v=1624302741890",
    links: ["https://taper.badquar.to/6/six_small_sketches.html"],
    desc: html`“Six Small Sketches” is a collection of 6 small sketches that is
inspired by Olivia Jack's Hydra live coding environment. Each sketch
is a code snippet representing the number in a geometric form, loaded
in a random sequence. The code fills, alters and paints the grid of
pixels, creating different patterns depending upon the order of
sketches.<br>
Published by Bad Quarto`
  },
  {
    start: new Date("June 5, 2021"),
    title: "Live Coding Online Workshop",
    type: ["workshop"],
    topic: ["hydra"],
    venue: "CityLeaks Festival (Germany)",
    collab: ["Naoto Hieda", "Cylvester"],
    image: "https://img.glitches.me/images/2021/06/08/B68D82AB-F6B1-416D-9755-6D2288FF2639.jpg",
    links: ["https://allyourbase.art/event/live-coding-workshop-with-naoto-hieda/"],
    desc: html`photo credit @konstantinjohanneshehl`
  },
  {
    start: new Date("March 27, 2021"),
    title: "Video Loop of Decolonial Resistance",
    type: ["installation"],
    topic: ["4 min 56 sec video"],
    venue: "K20 (Germany)",
    collab: ["Raphael Hillebrand"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fk20.jpg?v=1620678722784",
    links: ["https://www.instagram.com/p/CBm7isFnACw/"],
    desc: html`Choreography, interpretation and concept: Raphael Hillebrand<br>
    Music: Prolific the Rapper feat. John Trudell, It's not over<br>
    Camera: Naoto Hieda<br>
    Place: Academy of Performing Arts Hong Kong<br>
    Exhibited at <a href="https://www.kunstsammlung.de/en/exhibitions/joseph-beuys-jeder-mensch-ist-ein-kuenstler-en">"Everyone Is an Artist" Cosmopolitical Exercises with Joseph Beuys</a> (image on the left)<br>
    Recorded in 2019`
  },
  {
    start: new Date("March 12, 2021"),
    title: `TidalCycles Workshop "Hearing Code"`,
    type: ["workshop"],
    topic: ["tidalcycles"],
    venue: "online",
    collab: ["Naoto Hieda"],
    // image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpcd2021ogp.png?v=1612740183557",
    desc: html`Workshop at SUNY invited by Lee Tusman`
  },
  {
    start: new Date("February 20, 2021"),
    title: "Processing Community Day Japan 2021",
    type: ["meetup", "curation", "workshop", "lecture"],
    topic: ["processing", "tidalcycles", "hydra"],
    venue: "online",
    collab: ["PCD Tokyo"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpcd2021ogp.png?v=1612740183557",
    links: ["https://naotohieda.com/blog/processing-community-day-japan-2021-en/"],
    desc: html`Organization, curation, talk and workshop: Naoto Hieda<br>
    Poster and website: Hina Nakamura<br>
    Full credits in the link`
  },
  {
    start: new Date("February 15, 2021"),
    title: "#spektrum",
    type: ["installation"],
    topic: ["10 sec video", "nail polish"],
    venue: "Cologne Main Station (Germany)",
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FNaoto-Hieda.jpg?v=1620718676073",
    links: ["https://www.khm.de/studentische_arbeiten/id.30115.public-space-video-im-hbf-koln/"],
    desc: html`
#spektrum is a convolution of identity questions that we face, including, but not only, the gender spectrum and autism spectrum. The fingers as an analog, imperfect medium with a color spectrum of nail polish count binary numbers mimicking a self-stimulatory behavior (stimming) to provoke and to challenge the stereotype of "binariness" of autism.<br>
Exhibited as part of "ctrl+space" by Christian Sievers`
  },
  {
    start: new Date("February 13, 2021"),
    title: "Hydra meetup #4",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Ritchse", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image: "https://cdn.glitch.com/ded7bc3b-3878-467c-9524-bce0e27dfc1e%2Fposter4.png?v=1611315261539",
    links: ["https://hydra-meetup-4.glitch.me/"],
    desc: html`
      Poster: Ritchse
    `
  },
  {
    start: new Date("January 24, 2021"),
    title: "Introduction to Hydra",
    type: ["workshop"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "CCFest (online)",
    image:
      "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fvlcsnap-2021-01-24-22h54m34s826.png?v=1611525647011",
    links: ["https://ccfest-2021-glitchme.glitch.me/", "https://ccfest.rocks/register"],
    desc: html`
    `
  },
  {
    start: new Date("December 20, 2020"),
    title: "TidalClub Solstice",
    type: ["performance", "net art"],
    topic: ["hydra", "livelab", "tidalcycles"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "TidalClub (online)",
    image:
      "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2F201220-tidal.jpg?v=1608503105807",
    yt: "gN9DHCetfBE",
    desc: html`
      A performance at TidalClub Solstice Marathon using GlitchMe with Flor de
      Fuego.
    `
  },
  {
    start: new Date("December 18, 2020"),
    title: "GlitchMe Performance-Presentation",
    type: ["performance", "lecture", "net art"],
    topic: ["hydra", "livelab"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "CODAME (online)",
    image:
      "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2F201218-codame.jpg?v=1608479114980",
    yt: "Fas_pGA2tvk",
    desc: html`
      A performance-presentation at CODAME with Flor de Fuego.
    `
  },
  {
    start: new Date("December 15, 2020"),
    title: "Introduction to TidalCycles",
    type: ["workshop"],
    topic: ["tidalcycles"],
    collab: ["Naoto Hieda"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201215-tidal.jpg?v=1611416016009",
    desc: html`
    Workshop at "Sound und..." by Tobias Hartmann
    `
  },
  {
    start: new Date("December 12, 2020"),
    title: "Hydra meetup #3",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Ritchse", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201212-hydra03.jpg?v=1611416284311",
    links: ["https://hydra-meetup-3.glitch.me/"],
    desc: html`
      Poster: Flor de Fuego
    `
  },
  {
    start: new Date("December 6, 2020"),
    title: "Processing Community Hangout Japan 05",
    type: ["meetup"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    topic: ["processing", "japan"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201206-pchj05.png?v=1611416208142",
    links: ["https://pchj05.peatix.com/"],
    desc: html`
    `
  },
  {
    start: new Date("November 21, 2020"),
    title: "Hydra Exhibition",
    type: ["installation", "net art"],
    topic: ["hydra", "vr"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-11-21-hydra-exhibition.png?v=1611415274524",
    desc: html`
    Currently closed due to Twitter API
    `
  },
  {
    start: new Date("November 6, 2020"),
    title: "Showing",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Vivian Lu"],
    venue: "Theater Dortmund",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201106-theater.jpg?v=1611416466540",
    desc: html`
      Visual and interaction programming: Naoto Hieda
    `
  },
  {
    start: new Date("October 23, 2020"),
    title: "Tech is Nonbinary",
    type: ["performance", "net art"],
    topic: ["hydra", "dance"],
    collab: ["Naoto Hieda"],
    venue: "Creative Commons Global Summit (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-10-23-tech-is-nonbinary.png?v=1611415254316",
    yt: "z78i9_cHUeo",
    desc: html`
      Tech is Nonbinary is an audiovisual dance performance. Starting from a blank editor, graphics and sound are coded in real-time by live-coding environments, with expressions of body movements. The artist questions the classical way of rigid frameworks and productive scheme through an ephemeral and experimental nature of live coding. As images are generated by computer programs, the video may include flickering by accident.
    `
  },
  {
    start: new Date("October 17, 2020"),
    title: "Auf meinen Schultern",
    type: ["performance"],
    topic: ["feedback"],
    collab: ["Raphael Hillebrand"],
    venue: "Deutscher Tanzpreis / Aalto Theater (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201017-tanzpreis.png?v=1611415944571",
    desc: html`
    Camera operator: Naoto Hieda
    `
  },
  {
    start: new Date("October 8, 2020"),
    title: "Distant Movements",
    type: ["performance", "net art"],
    topic: ["dance", "zoom"],
    collab: ["Annie Abrahams", "Daniel Pinheiro", "Muriel Piqué"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-10-08-ccl-online.jpg?v=1611415526027",
      // "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fdm.jpg?v=1601460566624",
    desc: html`
      Distant Movements is a project by Annie Abrahams (FR/NL), Daniel Pinheiro
      (PT) and Muriel Piqué (FR). They develop an experimental, performative
      approach to examine what «dancing together» could mean in an environment
      where bodies are entangled with machines. Questions like: “Under what
      conditions can we dance together online?, “How will a dance practice in an
      artificial environment differ from a «normal» dance practice?”, “Can the
      emergence of dance in bodies that are both distant and together become
      visible and if so how?”, guide the project, which is also a concrete
      example of a remotely activated multilingual collaborative artistic
      research. DM comes to NODE20 as a one-off welcoming everyone.<br />
      15-min performance. The session took place on
      Zoom
      and streamed to
      <a href="https://hub.greenhousenaxos.com/tPxg6Vq/stage"
        >GreenHouse NAXOS</a
      >.<br>
      Curated by Naoto Hieda
    `
  },
  {
    start: new Date("October 7, 2020"),
    title: "Multidimensional Journey",
    type: ["performance", "net art"],
    topic: ["hubs", "miro", "green screen"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    image:
      "https://cdn.glitch.com/e9f27e4f-87e5-46c9-8645-e03a6aedc236%2F201007node.png?v=1603140395893",
    yt: "g5Hd_5rKggA",
    desc: html`
      At NODE20, Nien Tzu Weng and Naoto Hieda share online tools for
      interdisciplinary collaborations from the recent online residencies. We
      open the room for participants to experiment with the tools. No experience
      required.
    `
  },
  {
    start: new Date("October 7, 2020"),
    title: "Best Practices - Discussion",
    type: ["discussion"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image:
      "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fchat2.jpg?v=1601470552916",
    yt: "YZfMBoFWFZY",
    venue: "NODE20 (Germany / online)",
    desc: html`
      Jorge Guevara and Naoto Hieda discuss what they call Best Practices in
      Contemporary Dance. The session will be unstructured; they will initiate
      discussion about their experiences but everyone is welcome to join the
      conversation. In this discussion, the duo reflects on the “Best Practice”
      session that happens the day before (6th of October 2020).
    `
  },
  {
    start: new Date("October 6, 2020"),
    title: "Best Practices in Contemporary Dance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image:
      "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2F2020-09-03-best-practices-session.png?v=1601461259001",
    yt: "wxXguzTYt_I",
    // yt: "OBtI1qSLyVQ",
    // yt: "V427wRGGCZQ",
    venue: "NODE20 (Germany / online)",
    desc: html`
      Naoto Hieda and Jorge Guevara practice “Best Practices in Contemporary
      Dance” at NODE20. While they practice with their bodies, videos and
      glitches, everyone is invited to watch, to intervene and to participate in
      the session.
    `
  },
  {
    start: new Date("October 5, 2020"),
    title: "Best Practices - Discussion",
    type: ["discussion"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    image:
      "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2F201005chat.jpg?v=1601987022036",
    yt: "0-YILmKxVhY",
    desc: html`
      Jorge Guevara and Naoto Hieda discuss what they call Best Practices in
      Contemporary Dance. The session will be unstructured; they will initiate
      discussion about their experiences but everyone is welcome to join the
      conversation. Based on expertise in contemporary dance and media art, the
      duo talks about what they expect in the “Best Practice” session coming up
      on 6th of October.
    `
  },
  {
    start: new Date("October 4, 2020"),
    title: "Hydra meetup #2",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image:
      "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fhydra.jpg?v=1601986689294",
    links: ["https://hydra-meetup-2.glitch.me/"],
    yt: "xTL0BjtBq5k",
    // yt: "7ioV6D_OStY",
    desc: html`
      Hydra meetup #2 made an intervention at NODE20!
      <a href="hydra.ojack.xyz">Hydra</a>
      is a live-coding environment inspired by analog video synthesizer. Olivia
      Jack, the creator of Hydra, Flor de Fuego and Naoto Hieda hosted a meetup
      starting in Zoom and then a live-coding jam in GreenHouse NAXOS (around
      20:45 CEST). Everyone with or without experiences in Hydra is welcome!
      <a href="https://hydra-meetup-2.glitch.me/">More info here.</a>
    `
  },
  {
    start: new Date("October 4, 2020"),
    title: "TDSW x PCJ Vernissage",
    type: ["meetup", "net art"],
    topic: ["touchdesigner", "processing", "vvvv"],
    image:
      "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fvernissage.jpg?v=1601987505096",
    collab: ["Yasushi Harada", "Yuki Narumi", "Shunsuke Takawo", "Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    desc: html`
      Tokyo Developers Study Weekend (TDSW) and Processing Community Japan (PCJ)
      invite you to present your artworks at an exhibition, where everyone can
      virtually hang their works in the GreenHouse exhibition space. Be
      respectful to each other and let’s make a collective exhibition! The hosts
      will present in Japanese and English.
    `
  },
  {
    start: new Date("October 3, 2020"),
    talque: "https://20.nodeforum.org/program/?lectureId=fIT3yhH7pfPvnpLyMrWl",
    title: "Low Frequency Skies",
    type: ["lunch", "meetup"],
    topic: ["food"],
    collab: ["Raphaël de Courville", "Taru Muhonen"],
    venue: "NODE20 (Germany / online)",
    image:
      "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2F201003-02.jpg?v=1601728591081",
    desc: html`
      Low Frequency Skies is a lunch session run by Raphaël de Courville during
      quarantine to open a virtual space for his friends to eat and chat
      together. The legendary lunch session comes back during NODE20 at
      GreenHouse NAXOS – bring your friends and have breakfast, lunch or dinner
      together, depending on your time zone!<br>
      Curated by Naoto Hieda
    `
  },
  {
    start: new Date("October 2, 2020"),
    title: "Choreographic Coding Labs Online",
    type: ["curation", "meetup"],
    topic: ["hydra", "dance", "food"],
    collab: ["Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcconline.jpg?v=1611415565194",
    links: ["https://20.nodeforum.org/program/greenhouse-naxos/choreographic-coding-lab-online/", "https://naotohieda.com/blog/ccl-online-en/"],
    desc: html`
      Choreographic Coding Lab Online (CCLOnline) is an ever-evolving online format that welcomes dancers, choreographers, coders, artists and anyone interested in choreography and code to experiment artistic and scientific concepts within virtual spaces. During NODE20, one-to-two hours open sessions are planned regularly in GreenHouse NAXOS hosted by Naoto Hieda with a guest of the day. 
    `
  },
  {
    start: new Date("September 6, 2020"),
    title: "Online Hangs",
    type: ["meetup"],
    topic: [],
    collab: ["Marie Claire LeBlanc Flanagan", "Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F200906-hangs.jpg?v=1611416834409",
    desc: html`
    Poster: Marie Claire LeBlanc Flanagan
    `
  },  {
    start: new Date("August 30, 2020"),
    title: "Processing Community Hangout Japan 03",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-08-30-processing-community-hangout-japan-3-neort.jpg?v=1611415232395",
    desc: html`
    `
  },
  {
    start: new Date("August 19, 2020"),
    title: "TidalClub: New Moon Marathon",
    type: ["performance", "net art"],
    topic: ["tidalcycles", "discord"],
    collab: ["vc-study"],
    venue: "TidalClub (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-08-19-new-moon.png?v=1611415196073",
    links: ["https://naotohieda.com/blog/new-moon/"],
    desc: html`
      We participated in Tidal Club’s New Moon Marathon livestreaming, as a collective “vc-study” performing live-coded sound with TidalCycles. The event is a 24-hour non-stop livestreaming with 72 performance of 20 minute each. vc-study is an informal collective of Japanese artists and programmers learning or studying different creative-code related tools from scratch every week. One of the members, @FMS_Cat created tidal-bot that runs on Discord, interprets TidalCycles code mentioned on the chat and outputs sound on the voice chat. It is a neat implementation as many people can join and perform together, a similar goal as estuary but with a different approach.
    `
  },
  {
    start: new Date("August 1, 2020 18:00:00 UTC"),
    title: "Hydra meetup #1",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Ritchse", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image:
      "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2Fhydra-meetup1.png?v=1604872115474",
    links: ["https://hydra-meetup-0.glitch.me/"],
    desc: html`
      The first hydra meetup was held online on 1st August (Saturday) 18:00 UTC
      (20:00 CEST / 14:00 EDT).
    `
  },
  {
    start: new Date("July 21, 2020"),
    title: "Circles",
    type: ["performance"],
    topic: ["web"],
    collab: ["Amir Shpilman"],
    venue: "Die Irritierte Stadt (Germany)",
    desc: html`
      Web app: Naoto Hieda
    `
  },
  {
    start: new Date("July 6, 2020"),
    title: "Digital Dancing",
    type: ["lecture"],
    topic: ["dance"],
    collab: ["Toronto Love-In"],
    venue: "Toronto Love-In (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F200706-digitaldancing.jpg?v=1611412694852",
    links: ["http://tolovein.com/digital-dancing-fcpp/"],
    desc: html`
      Animated by Sasha Kleinplatz and Andrew Tay<br>
Guest panelists: Naoto Hieda, Brendan Jensen, Joana Chicau and Freya Björg Olafson
    `
  },
  {
    start: new Date("July 5, 2020"),
    title: "Processing Community Hangout Japan 02",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F200705-pchj02.png?v=1611417003823",
    links: ["https://pchj02.peatix.com/"],
    desc: html`
    `
  },
  {
    start: new Date("July 1, 2020"),
    title: "Virtual Exhibition 007",
    type: ["installation", "net art"],
    topic: ["vr"],
    collab: ["Naoto Hieda"],
    venue: "nextmuseum.io (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-07-01-virtual-exhibition-007.png?v=1611413239494",
    links: ["https://naotohieda.com/blog/virtual-exhibition-007/"],
    desc: html`
      
    `
  },
  {
    start: new Date("June 11, 2020 22:00:00 UTC"),
    title: "Sortie de résidence #4 at CCOV",
    type: ["performance", "net art"],
    topic: ["zoom", "jitsi", "miro", "scratch", "hubs"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "Centre de Création O Vertigo (online)",
    image:
      "https://cdn.glitch.com/e9f27e4f-87e5-46c9-8645-e03a6aedc236%2F200611ccov.jpg?v=1603140228336",
    links: ["https://www.facebook.com/events/903037330168173/"],
    desc: html`
      Nien Tzu Weng and Naoto Hiéda, working in Montreal and Germany
      respectively, were the last artists to take part in a CCOV Residency at a
      distance. On Thursday, June 11, at 4PM (EDT), you are invited to join them
      in a Zoom room as they discuss the outcomes of their work, the
      difficulties met on the way, their strategies for creating remotely, and
      much more!
    `
  },
  {
    start: new Date("June 1, 2020 16:00:00 UTC"),
    title: "CCOV Residency at a Distance",
    type: ["residency", "net art"],
    topic: ["jitsi", "miro", "cooking"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "Centre de Création O Vertigo (online)",
    image:
      "https://cdn.glitch.com/e9f27e4f-87e5-46c9-8645-e03a6aedc236%2F200601residence.png?v=1603140134648",
    yt: "HL6CTlNuzak",
    desc: html`
      Quarantine time confines a body in a limited space surrounded by flat
      walls and urges us to have a fixed routine at home that ends up in
      flatness of time. The physical world becomes stiff and tasteless.
      Meanwhile, in a digital space, time is not linear as there is no constant
      rhythm - by interrupting and confusing the network, the accelerated
      miscommunication can lead us to another channel of communication.
    `
  },
  {
    start: new Date("May 31, 2020"),
    title: "Processing Community Japan 30 Minute Coding 0",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-31-processing-community-japan-30min-coding-0-en.png?v=1611415150532",
    links: ["https://naotohieda.com/blog/processing-community-japan-30min-coding-0-en/"],
    desc: html`
    `
  },
  {
    start: new Date("May 30, 2020"),
    title: "15s or less Showcase - Stories from HK",
    type: ["net art"],
    topic: ["instagram", "hong kong"],
    collab: ["Naoto Hieda"],
    venue: "Umanesimo Artificiale (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-30-15s-or-less-filter.png?v=1611415171595",
    links: ["https://naotohieda.com/blog/15s-or-less/", "https://umanesimoartificiale.medium.com/15s-or-less-showcase-432f3e07fe52"],
    desc: html`
    “Stories from HK” focused on protests in Hong Kong by creating a new work and curating works that are related to the digital culture in Hong Kong (but not limited to the protest).
    `
  },
  {
    start: new Date("May 24, 2020"),
    title: "Algorithm | Degeneracy",
    type: ["performance", "net art"],
    topic: ["dance", "p-code"],
    collab: ["Naoto Hieda"],
    venue: "NL_CL / iii (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-24-nl-cl-2-flesh.png?v=1611415093981",
    links: ["https://naotohieda.com/blog/nl-cl-2-flesh/", "https://instrumentinventors.org/event/nl_cl-2-flesh/"],
    desc: html`
Algorithm | Degeneracy is a hybrid live-code-dance performance that travels between modalities such as images, emotions as words, sounds and movements through a perspective of high-functioning autism. Naoto Hieda, as a dancer and a live-coder, picks a word from a vocabulary of emotions and records movements overlaid on an image found on Google search. A chat interface is used to communicate with the audience; furthermore, each byte of an input text is translated into sound in a live-coding manner, adding another modality to express emotions. The performance takes place as a live-streaming and as an online installation in a custom virtual space where visitors can freely navigate. The online platform resembles a white gallery space, and the artifacts of the performance are installed on the fly. Contrary to the ephemerality of the performance, the recorded movements and sounds remain as a permanent exhibition.
`
  },
  {
    start: new Date("May 16, 2020"),
    title: "Processing Community Hangout Japan 01",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-16-processing-community-hangout-japan-1-1.png?v=1611415042036",
    links: ["https://pchj01.peatix.com/"],
    desc: html`
    `
  },
  {
    start: new Date("May 9, 2020"),
    title: "Processing Community Hangout 02",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda", "Saber Khan"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-09-processing-community-hangout-2-46.png?v=1611414960476",
    links: ["https://naotohieda.com/blog/processing-community-hangout-2-en/"],
    desc: html`
    `
  },
  {
    start: new Date("April 5, 2020"),
    title: "Processing Community Hangout 01",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda", "Saber Khan"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-04-05-processing-community-hangout-1-en.png?v=1611414930358",
    links: ["https://naotohieda.com/blog/processing-community-hangout-1-en/"],
    desc: html`
    `
  },
  {
    start: new Date("April 1, 2020"),
    title: "Yoshino Gypsum Art Foundation Fellowship",
    type: ["award"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Yoshino Gypsum Art Foundation",
    desc: html`
    `
  },
  {
    start: new Date("February 29, 2020"),
    title: "p-code Land",
    type: ["installation", "net art"],
    topic: ["p-code"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-29-p-code-land.jpg?v=1611414784827",
    links: ["https://naotohieda.com/blog/p-code-land/"],
    desc: html`
    p-code Land is an experimental virtual space for collective music live-coding. The syntax is based on <a href="https://github.com/p-code-magazine/p-code">p-code</a> but numbers denote MIDI notes not frequencies, and some features are added.
    `
  },
  {
    start: new Date("February 22, 2020"),
    title: "Tweet Processing Editor",
    type: ["net art"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-22-tweet-processing-editor.png?v=1611414830340",
    links: ["https://naotohieda.com/blog/tweet-processing-editor/", "https://tsubuyaki-p5-editor.glitch.me/"],
    desc: html`
An editor with preview and minification of a p5.js sketch for Tweet Processing.
    `
  },
  {
    start: new Date("February 14, 2020"),
    title: "Utopian Council",
    type: ["net art"],
    topic: ["vr"],
    collab: ["Utopian Council at KHM"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-14-utopian-council.png?v=1611414807270",
    links: ["https://naotohieda.com/blog/utopian-council/"],
    desc: html`
    `
  },
  {
    start: new Date("February 11, 2020"),
    title: "Virtual Exhibition 004",
    type: ["installation", "net art"],
    topic: ["vr"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-11-virtual-exhibition-004.png?v=1611417051165",
    links: ["https://naotohieda.com/blog/virtual-exhibition-004/", "https://blog.glitch.com/post/drag-and-drop-your-art-to-the-virtual-world"],
    desc: html`
    `
  },
  {
    start: new Date("February 5, 2020"),
    title: "Virtual Exhibition 003",
    type: ["performance"],
    topic: ["dance", "p-code"],
    collab: ["Naoto Hieda"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-05-virtual-exhibition-003.png?v=1611414757005",
    links: ["https://naotohieda.com/blog/virtual-exhibition-003/"],
    desc: html`
    `
  },
  {
    start: new Date("February 1, 2020"),
    title: "Processing Community Day Tokyo 2020",
    type: ["meetup", "curation"],
    topic: ["processing", "japan"],
    collab: ["PCD Tokyo"],
    venue: "Yahoo! LODGE (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-01-processing-community-day-tokyo-2020-kids.jpg?v=1611414728601",
    links: ["https://pcd-tokyo.github.io/2020/"],
    desc: html`
    `
  },
  {
    start: new Date("January 10, 2020"),
    title: "The Body and the Other",
    type: ["performance"],
    topic: ["processing", "dance"],
    collab: ["Eleonora Siarava"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fthe-body-and-the-other-2048x862.jpg?v=1611417103032",
    links: ["https://vimeo.com/463813053"],
    desc: html`
Concept-choreography-artistic direction: Eleonora Siarava<br>
Dancers: Mina Ananiadou, Yana Novotorova<br>
Digital artist: Naoto Hieda<br>
Technology Development: Mixed Reality and Visualization Team [MIREVI]<br>
Sound Design: Jonas Knohl, MIREVI<br>
Project Coordinator: Ivana Druzetic, MIREVI<br>
Costumes-external eye: Anne Weyler<br>
`
  },
  {
    start: new Date("December 28, 2019"),
    title: "Algorithm | Diversion",
    type: ["lecture"],
    topic: ["autism"],
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F191228-ccc.jpg?v=1611417381810",
    links: ["https://naotohieda.com/blog/36c3/"],
    yt: "mh72oryqPYg",
    desc: html`
      Before media art has emerged, traditional art and dance are already applying algorithms to make sophisticated patterns in their textures or movements. Hieda is researching the use of algorithm through creation of media installations and dialog with artists, dancers, choreographers and musicians. He also presents his current interest in machine learning and art which potentially exclude (or already excluding) some populations due to the dataset and modality.
    `
  },
  {
    start: new Date("December 22, 2019"),
    title: "Hydra Book",
    type: ["tutorial", "book"],
    topic: ["hydra"],
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fhydra-book.png?v=1611426374077",
    links: ["https://hydra-book.glitch.com/"],
    desc: html`
      
    `
  },
  {
    start: new Date("November 28, 2019"),
    title: "Creative Code Köln",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Akkuraum (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2019-12-05-cck-meetup-intro.jpg?v=1611414668474",
    links: ["https://naotohieda.com/blog/creative-code-koeln-1/"],
    desc: html`
    `
  },
  {
    start: new Date("November 14, 2019"),
    title: "Articulation Hackathon",
    type: ["meetup"],
    topic: ["dance", "unity"],
    collab: ["Asaf Bachrach"],
    venue: "CNRS (France)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2019-11-15-articulation.png?v=1611414638191",
    desc: html`
    `
  },
  {
    start: new Date("October 11, 2019"),
    title: "Staebetanzen",
    type: ["performance"],
    topic: ["dance", "machine learning", "processing"],
    collab: ["Raphael Hillebrand", "Naoto Hieda", "HKAPA Students"],
    venue: "Hong Kong Academy for Performing Arts (Hong Kong)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fhkapa.jpg?v=1611413240992",
    links: ["https://vimeo.com/366438999"],
    desc: html`
    "Stäbetanz" is originally a choreography by Oskar Schlemmer. It is part of the Bauhaus dances. In honor of 100 years anniversary of Bauhaus we created a 21st century version of the "Stäbetanz". This time the poles (Stäbe) are created by a motiontracking system created by Naoto Hieda. The residency programm which made this possible is supported by the Hong Kong Academy of Performing Arts and the Goethe Institut.<br>
Choreography: Raphael Hillebrand<br>
Visual programming and machine learning: Naoto Hieda
    `
  },
  {
    start: new Date("September 28, 2019"),
    title: "Passing Light",
    type: ["installation"],
    topic: ["vvvv", "processing", "puredata", "raspberry pi", "projection"],
    collab: ["Michael Montanaro", "Naoto Hieda", "Tatev Yesayan"],
    venue: "CHAOSMOSIS mAchInes / University of Toronto (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpl.png?v=1611413247644",
    links: ["https://www.cdtps.utoronto.ca/events/chaosmosis-machines"],
    desc: html`
    `
  },
  {
    start: new Date("September 16, 2019"),
    title: "HKAPA",
    type: ["residency", "workshop"],
    topic: ["dance", "machine learning", "processing"],
    collab: ["Raphael Hillebrand", "Naoto Hieda"],
    venue: "Hong Kong Academy for Performing Arts (Hong Kong)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-03-01-node-proposal-pathfinder-hkapa.jpg?v=1611414857759",
    desc: html`
    `
  },
  {
    start: new Date("September 12, 2019"),
    title: "XM-Profiler Prime",
    type: ["commercial"],
    topic: ["openFrameworks", "ingress"],
    collab: ["Ito-En"],
    venue: "Ito-En (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-03-12-financing-as-an-artist-2020-en.jpg?v=1611425599212",
    desc: html`
      Ingress visualizer installed in Tokyo, Sendai, Kyoto and Osaka<br>
      Visual programming: Naoto Hieda
    `
  },
  {
    start: new Date("September 6, 2019"),
    title: "Walk 4 Me",
    type: ["installation"],
    topic: ["dance", "processing"],
    collab: ["Christopher Matthews", "Naoto Hieda"],
    venue: "Dance4 (UK)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-03-01-node-proposal-walk4me.jpg?v=1611417219559",
    desc: html`
    Concept, video: Christopher Matthews<br>
    Interaction programming: Naoto Hieda
    `
  },
  {
    start: new Date("August 30, 2019"),
    title: "Nails | Pixels | Stimming",
    type: ["installation"],
    topic: ["weaving"],
    collab: ["Naoto Hieda"],
    venue: "Victoria and Albert Museum",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fnpsw.jpg?v=1611413846212",
    desc: html`
      V&A Friday Late at Victoria and Albert Museum (UK)
    `
  },
  {
    start: new Date("June 20, 2019"),
    title: "Open, Closed, Open",
    type: ["installation"],
    topic: ["robot", "unity"],
    collab: ["Amir Shpilman", "Liat Grayver", "Yair Kira"],
    venue: "Jewish Museum Berlin",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F190620-oco.jpg?v=1611417273312",
    desc: html`
      Robotics: So Kanno, Naoto Hieda<br>
      Interactive visuals assistance: Naoto Hieda
    `
  },
  {
    start: new Date("April 29, 2019"),
    title: "11th Choreographic Coding Lab",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Motion Bank"],
    venue: "Motion Bank",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-24-nl-cl-2-flesh-ccl.png?v=1611415120197",
    desc: html`
    `
  },
  {
    start: new Date("April 12, 2019"),
    title: "Beyond Time",
    type: ["commercial"],
    topic: ["openFrameworks"],
    collab: ["Shiseido", "R/GA"],
    venue: "S/PARK (Japan)",
    desc: html`
      Visual programming assistance: Naoto Hieda
    `
  },
  {
    start: new Date("February 2, 2019"),
    title: "Processing Community Day Tokyo 2019",
    type: ["meetup", "curation", "lecture"],
    topic: ["processing", "japan"],
    collab: ["PCD Tokyo"],
    venue: "Yahoo! LODGE (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpcd2.jpg?v=1611413240902",
    links: ["https://naotohieda.com/blog/processing-community-day-tokyo-2019/"],
    desc: html`
      Organization, curation and talks: Naoto Hieda<br>
      Full credits in the link
    `
  },
  {
    start: new Date("January 25, 2019"),
    title: "Cosmic Wander",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Choy Ka Fai"],
    venue: "tanzhaus nrw (Germany)",
    desc: html`
      Visual programming (work-in-progress): Naoto Hieda
    `
  },
  {
    start: new Date("January 17, 2019"),
    title: "Dance Clinic Mobile",
    type: ["performance"],
    topic: ["dance", "eeg", "processing"],
    collab: ["Choy Ka Fai"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fdanceclinic.jpg?v=1611431554115",
    desc: html`
      Visual, interaction programming: Naoto Hieda<br>
image from tanzhaus nrw
    `
  },
  {
    start: new Date("January 15, 2019"),
    title: "Algorithm | Diversion",
    type: ["lecture"],
    topic: ["dance", "autism", "processing"],
    collab: ["Naoto Hieda"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    desc: html`
      Talk at symposium "Technological flesh!"
    `
  },
  {
    start: new Date("January 15, 2019"),
    title: "fragility.jpg",
    type: ["installation"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Asia Culture Center (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Frwg2.jpg?v=1625565841620",
    links: ["http://thisweekendroom.com/wp/rwg2/"],
    desc: html`
      Screened in the frame of RECENT WORK GALLERY Ⅱ
    `
  },
  {
    start: new Date("November 22, 2018"),
    title: "Algorithm/Pattern/Diversity",
    type: ["lecture"],
    topic: ["autism", "processing"],
    collab: ["Naoto Hieda"],
    venue: "CITEC, Bielefeld University (Germany)",
    links: ["https://cit-ec.de/de/events/guest-talk-naoto-hieda"],
    desc: html`
    `
  },
  {
    start: new Date("November 7, 2018"),
    title: "IMPACT18 - Matter in Movement",
    type: ["conference"],
    topic: ["autism"],
    collab: ["PACT Zollverein"],
    venue: "PACT Zollverein (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F181107-impact.jpg?v=1611425497483",
    desc: html`
    `
  },
  {
    start: new Date("November 1, 2018"),
    title: "XM-Profiler",
    type: ["commercial"],
    topic: ["openFrameworks", "ingress"],
    collab: ["Ito-En"],
    venue: "Ito-En (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F181101-xmprofiler.jpg?v=1611425554192",
    desc: html`
      Ingress visualizer installed in Tokyo, Sendai, Kyoto and Osaka<br>
      Visual programming: Naoto Hieda
    `
  },
  {
    start: new Date("October 1, 2018"),
    title: "Jeux de Rebans",
    type: ["commercial"],
    topic: ["openFrameworks"],
    collab: ["Matilda"],
    venue: "Mikimoto (Japan)",
    image: "https://cdn.glitch.me/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FIMG_4349.JPG?v=1634855386589",
    desc: html`
      Visual programming: Naoto Hieda
    `
  },
  {
    start: new Date("September 21, 2018"),
    title: "Processing and Generative Art",
    type: ["lecture", "workshop"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul National University of Education (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsnue-processing.jpg?v=1611429706839",
    desc: html`
      Guest talk at SNUE invited by Woosung Jung
    `
  },
  {
    start: new Date("September 14, 2018"),
    title: "Usine 108",
    type: ["performance"],
    topic: ["processing", "machine learning"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsasg2.jpg?v=1611413236868",
    links: ["https://blog.naver.com/sas_g/221428126204"],
    desc: html`
    `
  },
  {
    start: new Date("September 13, 2018"),
    title: "Autistic View",
    type: ["installation"],
    topic: ["openframeworks"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fautistic.png?v=1611425982233",
    desc: html`
    An installation with sauna receipts and shots on streets
    `
  },
  {
    start: new Date("August 17, 2018"),
    title: "Mapping Party #3",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmapping-party-3.jpg?v=1611425966652",
    desc: html`
      party with projection mapping
    `
  },
  {
    start: new Date("August 8, 2018"),
    title: "Mapping Party #2",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmapping-party-2.jpg?v=1611425950417",
    desc: html`
      party with projection mapping
    `
  },
  {
    start: new Date("July 24, 2018"),
    title: "Deep Performance Dwelling",
    type: ["installation"],
    topic: ["vvvv"],
    collab: ["Team MTL"],
    venue: "Solar Decathlon (China)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsolar-decathlon.png?v=1611426495269",
    desc: html`
      Visuals, interaction programming: Naoto Hieda
    `
  },
  {
    start: new Date("July 19, 2018"),
    title: "Mapping Party #1",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsasg.png?v=1611413249718",
    desc: html`
      party with projection mapping
    `
  },
  {
    start: new Date("July 16, 2018"),
    title: "Call Stack",
    type: ["residency", "net art"],
    topic: ["processing"],
    collab: ["Janine Harrington", "Naoto Hieda"],
    venue: "Digitale Performance Web Residency / Favoriten Festival (Germany, online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcs.png?v=1611413234621",
    desc: html`
    `
  },
  {
    start: new Date("July 3, 2018"),
    title: "Artist in Residence",
    type: ["residency"],
    topic: ["processing"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fusine.png?v=1611413241153",
    desc: html`
    `
  },
  {
    start: new Date("June 28, 2018"),
    title: "Skin Irony Virtual Screen",
    type: ["commercial"],
    topic: ["openFrameworks"],
    collab: ["Matilda"],
    venue: "Swatch (Japan)",
    image: "https://cdn.glitch.me/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FIMG_2495.JPG?v=1634855384659",
    desc: html`
      Visual programming: Naoto Hieda
    `
  },
  {
    start: new Date("April 28, 2018"),
    title: "Choreographic Coding Lab + Pathfinder",
    type: ["workshop"],
    topic: ["processing", "pathfinder"],
    collab: ["Christian Mio Loclair", "Naoto Hieda"],
    venue: "NOVA Festival / Point (Romania)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpathrefinder.jpg?v=1611413242207",
    desc: html`
      
    `
  },
  {
    start: new Date("April 26, 2018"),
    title: "Machine Learning for Artists",
    type: ["translation"],
    topic: ["machine learning"],
    collab: ["Kenichi Yoneda", "Naoto Hieda"],
    venue: "online",
    desc: html`
    `
  },
  {
    start: new Date("April 18, 2018"),
    title: "Pecha Kucha at TML #3",
    type: ["meetup"],
    topic: [],
    collab: ["Topological Media Lab"],
    venue: "Topological Media Lab (Canada)",
    desc: html`
      Organizer: Naoto Hieda
    `
  },
  {
    start: new Date("April 4, 2018"),
    title: "Pecha Kucha at TML #2",
    type: ["meetup"],
    topic: [],
    collab: ["Topological Media Lab"],
    venue: "Topological Media Lab (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpecha-kucha-2.png?v=1611427074334",
    desc: html`
      Organizer: Naoto Hieda
    `
  },
  {
    start: new Date("March 22, 2018"),
    title: "KUU",
    type: ["installation"],
    topic: ["processing"],
    collab: ["KUU"],
    venue: "SNDO (Netherlands)",
    desc: html`
    `
  },
  {
    start: new Date("March 8, 2018"),
    title: "Pecha Kucha at TML #1",
    type: ["meetup"],
    topic: [],
    collab: ["Topological Media Lab"],
    venue: "Topological Media Lab (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpecha-kucha-1.jpg?v=1611427090222",
    desc: html`
      Talk: Naoto Hieda
    `
  },
  {
    start: new Date("March 3, 2018"),
    title: "body_code",
    type: ["performance"],
    topic: ["processing", "dance"],
    collab: ["CCOV", "perte de signal"],
    venue: "Centre de Création O Vertigo (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fbc.png?v=1611413236556",
    desc: html`
    `
  },
  {
    start: new Date("February 12, 2018"),
    title: "Machine Learning Literacy",
    type: ["conference"],
    topic: ["machine learning"],
    collab: ["School for Poetic Computation"],
    venue: "School for Poetic Computation (US)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F180215-sfpc-drawing.jpg?v=1611427045030",
    desc: html`
    `
  },
  {
    start: new Date("January 13, 2018"),
    title: "Performance",
    type: ["performance"],
    topic: ["raspberry pi"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Centre Clark (Canada)",
    links: ["https://medium.com/@naoto_hieda/raspberry-pi-zero-for-interactive-sound-performance-at-centre-clark-8ebe96da1f2a"],
    desc: html`
      Composition and performance: Evelyne Drouin<br>
      Development: Naoto Hieda
    `
  },
  {
    start: new Date("December 18, 2017"),
    title: "Artist in Residence",
    type: ["residency"],
    topic: ["dance"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "Studio 303 (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpathrefinder.png?v=1611413251097",
    desc: html`
    
    `
  },
  {
    start: new Date("November 14, 2017"),
    title: "Beatdox",
    type: ["performance"],
    topic: ["dance", "eeg"],
    collab: ["Olivier Lalonde", "Naoto Hieda"],
    venue: "RIDM / Cinémathèque Québecoise (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fridm.jpg?v=1611431764686",
    desc: html`
    image from MUSICMOTION website
    `
  },
  {
    start: new Date("November 1, 2017"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Cancerto (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmuse.png?v=1611413236306",
    desc: html`
    `
  },
  {
    start: new Date("October 23, 2017"),
    title: "Mobile Brain-Computer Interface for Dance and Somatic Practice",
    type: ["installation"],
    topic: ["python", "eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "UIST (Canada)",
    desc: html`
  
    `
  },
  {
    start: new Date("October 14, 2017"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "NeuroTechTO / TAVES / Toronto Congress Centre (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("October 5, 2017"),
    title: "Passing Light",
    type: ["installation"],
    topic: ["vvvv", "processing", "puredata", "raspberry pi", "projection"],
    collab: ["Michael Montanaro", "Naoto Hieda", "Tatev Yesayan"],
    venue: "MAPP_MTL Invisible Exhibition Micro-Mapping / Never Apart (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpl.png?v=1611413247644",
    desc: html`
      Concept and direction: Michael Montanaro<br>
      Visual programming: Naoto Hieda<br>
      Fabrication: Tatev Yesayan
    `
  },
  {
    start: new Date("August 10, 2017"),
    title: "Seismic Session",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Doris Uhlich"],
    venue: "ImPulsTanz / Secession (Austria)",
    desc: html`
    `
  },
  {
    start: new Date("July 9, 2017"),
    title: "Lads",
    type: ["installation"],
    topic: ["dance", "openFrameworks", "max"],
    collab: ["Christopher Matthews"],
    venue: "Villa Empain (Belgium)",
    desc: html`
      Sound programming: Naoto Hieda
    `
  },
  {
    start: new Date("June 16, 2017"),
    title: "Passing Light",
    type: ["installation"],
    topic: ["vvvv", "processing", "puredata", "raspberry pi", "projection"],
    collab: ["Michael Montanaro", "Jerome Delapierre", "Naoto Hieda", "Tatev Yesayan"],
    venue: "InTime / Topological Media Lab (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpl.png?v=1611413247644",
    desc: html`
      Concept and direction: Michael Montanaro, Jerome Delapierre<br>
      Visual programming: Jerome Delapierre, Naoto Hieda<br>
      Fabrication: Tatev Yesayan
    `
  },
  {
    start: new Date("June 10, 2017"),
    title: "Hack the Brain",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Science Gallery Dublin"],
    venue: "Science Gallery Dublin (Ireland)",
    desc: html`
    hackathon group lead
    `
  },
  {
    start: new Date("May 6, 2017"),
    title: "8th Choreographic Coding Lab",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Motion Bank"],
    venue: "De Brakke Grond (Netherlands)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Feegccl.jpg?v=1611413244834",
    desc: html`
    
    `
  },
  {
    start: new Date("April 27, 2017"),
    title: "Transenses",
    type: ["performance"],
    topic: ["dance", "max"],
    collab: ["Akiko Kitamura", "Navid Navab"],
    venue: "Tangente (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fts.png?v=1611413246147",
    links: ["https://vimeo.com/238534871", "https://naotohieda.com/blog/transenses/"],
    desc: html`
    Ideation, artistic direction and dramaturgy : NAVIKO (Akiko Kitamura + Navid Navab)<br>
    Choreography and performance : Akiko Kitamura<br>
    Audiovisual composition, gestural sound and interactive scenography : Navid Navab<br>
    Visual programming: Naoto Hieda, Evan Montpellier
    `
  },
  {
    start: new Date("April 1, 2017"),
    title: "Pola Art Foundation Fellowship",
    type: ["award"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Pola Art Foundation",
    desc: html`
    `
  },
  {
    start: new Date("March 7, 2017"),
    title: "Chorégraphie Cérébrale",
    type: ["performance"],
    topic: ["dance", "eeg"],
    collab: ["Olivier Lalonde", "Naoto Hieda", "Marie-Noëlle De Sève"],
    venue: "Printemps Numeriques / Canadian Centre for Architecture (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcc.jpg?v=1611413239347",
    desc: html`
    
    `
  },
  {
    start: new Date("March 3, 2017"),
    title: "Performance",
    type: ["performance"],
    topic: ["arduino"],
    collab: ["Evelyne Drouin", "Captain Az!z"],
    venue: "Nuit Blanche / Société des Arts Technologiques (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("February 13, 2017"),
    title: "Scènes Ouvertes",
    type: ["performance"],
    topic: ["scenic", "processing", "arduino"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Société des Arts Technologiques (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fso.jpg?v=1611413239746",
    desc: html`
    
    `
  },
  {
    start: new Date("November 12, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "TEDxMontreal (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("October 2, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "World Maker Faire (US)",
    desc: html`
    `
  },
  {
    start: new Date("September 23, 2016"),
    title: "An Intelligent Floor Surface for Foot-based Exploration of Geospatial Data",
    type: ["conference", "lecture"],
    topic: ["haptics"],
    collab: ["Naoto Hieda", "Jan Anlauff"],
    venue: "International Workshop on Multimedia Signal Processing (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("August 14, 2016"),
    title: "Showing",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Ainesh Madan"],
    venue: "ImPulsTanz / Leopold Museum (Austria)",
    desc: html`
    `
  },
  {
    start: new Date("July 29, 2016"),
    title: "That Choreographs Us!",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Benoit Lachambre"],
    venue: "ImPulsTanz (Austria)",
    desc: html`
    `
  },
  {
    start: new Date("July 14, 2016"),
    title: "danceWEB",
    type: ["residency", "award"],
    topic: ["dance"],
    collab: ["Naoto Hieda"],
    venue: "ImPulsTanz (Austria)",
    desc: html`
    `
  },
  {
    start: new Date("May 31, 2016"),
    title: "Composite Particles",
    type: ["installation"],
    topic: ["unity"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "IX Symposium (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcomposite.png?v=1611413241382",
    desc: html`
    `
  },
  {
    start: new Date("May 27, 2016"),
    title: "Workshop on Mobile EEG for Neuroscience",
    type: ["lecture"],
    topic: ["eeg"],
    collab: ["BRAMS"],
    venue: "BRAMS (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("April 26, 2016"),
    title: "Avian Attractor",
    type: ["installation", "conference"],
    topic: ["openFrameworks"],
    collab: ["Judith Doyle", "Naoto Hieda"],
    venue: "CHI Art Exhibition / Works/San José (US)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Favian.png?v=1611413232640",
    desc: html`
    `
  },
  {
    start: new Date("April 30, 2016"),
    title: "Glitch 3D",
    type: ["meetup"],
    topic: ["3D scan", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Virtual Reality Hackathon (Canada)",
    links: ["https://devpost.com/software/glitch-3d"],
    desc: html`
    `
  },
  {
    start: new Date("April 22, 2016"),
    title: "Glitch over Emotion Transfer Protocol",
    type: ["meetup"],
    topic: ["face tracking", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Hack Day (Canada)",
    links: ["https://vimeo.com/164074864"],
    desc: html`
    
    `
  },
  {
    start: new Date("April 21, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "NeuroTechTO / Bnotions (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("April 12, 2016"),
    title: "Using brain waves to do art",
    type: ["workshop"],
    topic: ["eeg", "python"],
    collab: ["Naoto Hieda"],
    venue: "NeuroTechMTL (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("February 27, 2016"),
    title: "Composite Particles",
    type: ["installation", "award"],
    topic: ["unity"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Nuit Blanche / Société des Arts Technologiques (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcomposite.png?v=1611413241382",
    desc: html`
    `
  },
  {
    start: new Date("January 28, 2016"),
    title: "Igloofest",
    type: ["performance"],
    topic: ["openFrameworks"],
    collab: ["Evelyne Drouin", "Captain Az!z"],
    venue: "Igloofest (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Figloofest.png?v=1611413241721",
    desc: html`
    `
  },
  {
    start: new Date("January 25, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "TEDxMontreal Cocktail Party (Canada)",
    desc: html`
    `
  },
  {
    start: new Date("November 8, 2015"),
    title: "MINIW",
    type: ["installation"],
    topic: ["unity"],
    collab: ["Naoto Hieda"],
    venue: "Maker Faire Ottawa (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fminiw.png?v=1611413244674",
    desc: html`
    `
  },
  {
    start: new Date("November 7, 2015"),
    title: "MINIW and Bizarrege (Play)",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "TEDxMontreal / Usine C (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FbizarregePlay.png?v=1611413243748",
    desc: html`
    `
  },
  {
    start: new Date("August 27, 2015"),
    title: "4th Choreographic Coding Lab",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Motion Bank"],
    venue: "NYU (US)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fccl4smalt.png?v=1611413242798",
    desc: html`
      Cellular Body
    `
  },
  {
    start: new Date("August 14, 2015"),
    title: "Crow Panel",
    type: ["installation", "conference"],
    topic: ["openFrameworks"],
    collab: ["Judith Doyle"],
    venue: "ISEA / Museum of Vancouver (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Ftelus.png?v=1611413235692",
    desc: html`
    `
  },
  {
    start: new Date("August 1, 2015"),
    title: "Bizarrege",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Maker Faire Toronto / Toronto Reference Library (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fbizarrege.png?v=1611413244616",
    desc: html`
    `
  },
  {
    start: new Date("June 10, 2015"),
    title: "Digital Facial Augmentation for Interactive Entertainment",
    type: ["installation", "conference", "lecture"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "INTETAIN (Italy)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fintetain.png?v=1611431309761",
    desc: html`
    `
  },
  {
    start: new Date("May 25, 2015"),
    title: "Google Summer of Code",
    type: ["residency"],
    topic: ["opencv"],
    collab: ["Naoto Hieda"],
    venue: "OpenCV / Google (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fgsoc.png?v=1611413237000",
    desc: html`
    `
  },
  {
    start: new Date("April 11, 2015"),
    title: "sharedFace2",
    type: ["installation", "conference", "lecture"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Laval Virtual (France)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FsharedFace2.png?v=1611413246373",
    desc: html`
    `
  },
  {
    start: new Date("February 28, 2015"),
    title: "Mémoire Liquide",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Marcella França"],
    venue: "Nuit Blanche / Société des Arts Technologiques (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmemoire.png?v=1611413242700",
    desc: html`
    `
  },
  {
    start: new Date("October 23, 2014"),
    title: "sharedFace",
    type: ["installation", "award"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "IVRC (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FsharedFace.png?v=1611413244019",
    desc: html`
    `
  },
  {
    start: new Date("May 15, 2014"),
    title: "Image Processing with the Microsoft Kinect",
    type: ["workshop", "lecture"],
    topic: ["kinect"],
    collab: ["Naoto Hieda"],
    venue: "GRAND (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FgrandKinect.png?v=1611413245485",
    desc: html`
    organization and lecture
    `
  },
  {
    start: new Date("May 14, 2014"),
    title: "Kinetic Video Projection for Theatre Lighting",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "GRAND (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fgrand2014.jpg?v=1611413235968",
    desc: html`
    `
  },
  {
    start: new Date("June 11, 2012"),
    title: "SPIDAR-mouse OSX/Linux Driver",
    type: ["installation"],
    topic: ["haptics"],
    collab: ["Naoto Hieda"],
    venue: "",
    image: "https://naotohieda.com/img/spidarMouse.jpg",
    desc: html`
    `
  },
];

export default sc;
