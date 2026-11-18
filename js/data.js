/* M-CAN content data. Edit this file to add or change items: every page reads from it.
   Each news/publication/multimedia item needs a unique id (used in the post page address).
   Optional "content": ["Paragraph 1", "Paragraph 2"] fills the post page; without it the excerpt is shown.
   Partner logos: put each logo in the logos/ folder using the file name shown (any of png, jpg, jpeg, svg, webp). */
window.MCAN = {
  pageSize: 6, /* items per page on the News, Publications and Multimedia pages */
  news: [
    { id: "mcaw-2023-lets-walk-about-it-2026", title: "Myanmar Climate Action Week 2023: Let’s Walk About It!", date: "2026-07-31", tag: "News & Events", url: "https://myanmar-can.com/myanmar-climate-action-week-2023-lets-walk-about-it/", excerpt: "" },
    { id: "mcaw-2023-lets-walk-about-it", title: "Myanmar Climate Action Week 2023: Let’s Walk About It!", date: "2023-09-24", tag: "News & Events", url: "https://myanmar-can.com/iutc-training/", excerpt: "Climate change remains today, in Myanmar and throughout the world, an existential threat. UN-Habitat, in collaboration with other development partners,…" },
    { id: "mcaw-2024-building-resilience", title: "Building Resilience in a Polycrisis: A Successful Myanmar Climate Action Week (MCAW) 2024", date: "", tag: "UN-Habitat", url: "https://fukuoka.unhabitat.org/information/7179", excerpt: "UN-Habitat Myanmar and its partners concluded MCAW 2024, with more than 20 M-CAN member organizations taking part." },
    { id: "wuf12-building-resilience", title: "Building Resilience in a Polycrisis in Myanmar: UN-Habitat Myanmar and M-CAN at WUF12", date: "", tag: "UN-Habitat", url: "https://fukuoka.unhabitat.org/information/7536", excerpt: "M-CAN members joined UN-Habitat Myanmar to represent Myanmar at the Twelfth Session of the World Urban Forum." }
  ],
  publications: [
    { id: "nbs-practice-compendium", title: "Nature-Based Solutions for Climate Adaptation in Myanmar: A Practice Compendium and MCAN Recommendations", year: "2026", tag: "Report", url: "https://www.iied.org/22737g", excerpt: "A practice compendium with recommendations from the Myanmar Climate Action Network, available through IIED." }
  ],
  multimedia: [
    { id: "un-habitat-myanmar-youtube", title: "UN-Habitat Myanmar on YouTube", tag: "Video channel", url: "https://www.youtube.com/@un-habitatmyanmar4961", excerpt: "Watch videos, webinars and event recordings." }
  ],
  partners: [
    { name: "AES Myanmar", logo: "logos/aes-myanmar" },
    { name: "Back To Nature", logo: "logos/back-to-nature" },
    { name: "Blue Temple", logo: "logos/blue-temple" },
    { name: "Cynthia Design", logo: "logos/cynthia-design" },
    { name: "Housing Now", logo: "logos/housing-now" },
    { name: "Let’s Do It Myanmar", logo: "logos/lets-do-it-myanmar" },
    { name: "MIMU", logo: "logos/mimu" },
    { name: "Myanmar Underwater Organization", logo: "logos/myanmar-underwater-organization" },
    { name: "Myanmar Water Academy", logo: "logos/myanmar-water-academy" },
    { name: "Yoma", logo: "logos/yoma" },
    { name: "MYANWEN", logo: "logos/myanwen" }
  ]
};
