/* The Azoki Market catalogue. Edit this file to change what the shop sells.

   PLACEHOLDERS TO REPLACE BEFORE GOING LIVE
   - Prices, size lists and "details" lines are stand-ins, EXCEPT the Coded Lens prints (No. 012 to 021):
     those were costed on 2026-11-24 from Printify (Sensaria matte posters, US shipping included in
     the price). `prices` lists one price per size, in the same order as options.Size.
   - Product pictures are drawn by the site from the artwork in assets/ (a frame, a hanging
     cloth, a light box, a sweatshirt). Swap in real photos by setting `photo: 'assets/your.jpg'`
     on a product: when it is set, the photo is shown instead of the drawn mock-up.
   - checkoutUrl is empty, so the cart's checkout button only explains that checkout is not
     connected. Set it (or a per-product `buyUrl`) once a payment provider is chosen.

   OPENING THE SHOP
   - `open: false` means nothing is for sale yet: prices are hidden everywhere, "add to cart"
     becomes "shortlist", and the shortlist is sent along with the email sign-up.
     Change it to `open: true` once the prices are real and checkoutUrl is set.
   - signupTo is where sign-ups are emailed (through formsubmit.co).
*/
window.MARKET = {
  open: false,
  signupTo: 'hello@azokistudios.com',
  currency: '$',
  checkoutUrl: '',
  studios: 'https://azokistudios.com',
  codedLens: 'https://codedlens.com',
  categories: [
    { id: 'prints', name: 'Prints', note: 'Framed-size art prints' },
    { id: 'tapestries', name: 'Tapestries', note: 'Wall hangings' },
    { id: 'glow', name: 'Glow boxes', note: 'Light-up shadow boxes' },
    { id: 'embroidery', name: 'Embroidery', note: 'Stitched crewnecks' },
    { id: 'mirrors', name: 'Mirrors', soon: true },
    { id: 'figures', name: 'Figures', soon: true }
  ],
  products: [
    {
      id: 'whale-print', no: '001', name: 'The Whale', cat: 'prints', type: 'print',
      art: 'assets/art-whale.jpg', wall: '#d8cfbd', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'A humpback made of letters, rising past the glass. Taken from Code Sea at the moment the whale fills the screen.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included', 'Every character in the picture is real text']
    },
    {
      id: 'bloom-print', no: '002', name: 'Jelly Bloom', cat: 'prints', type: 'print',
      art: 'assets/art-bloom.jpg', wall: '#c9cfd4', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'Jellyfish of every size rising out of the deep, their bells spelled out in symbols.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'deep-print', no: '003', name: 'The Deep', cat: 'prints', type: 'print',
      art: 'assets/art-deep.jpg', wall: '#bfb8c9', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'The light fades and the plankton glows. The quiet scene, for a quiet wall.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'sunset-print', no: '004', name: 'Hearthside, 18:36', cat: 'prints', type: 'print',
      art: 'assets/art-village-sunset.jpg', wall: '#e3cdb4', price: 24, frame: '#6b4a2e',
      from: 'Hearthside', fromId: 'hearthside',
      blurb: 'The painted village at sunset, seen from high above, with the lamps about to come on.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'noon-print', no: '005', name: 'Hearthside, Noon', cat: 'prints', type: 'print',
      art: 'assets/art-village-noon.jpg', wall: '#d5dcc6', price: 24, frame: '#6b4a2e',
      from: 'Hearthside', fromId: 'hearthside',
      blurb: 'Red roofs, blue roofs and a great deal of green. The village at its brightest.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'starry-print', no: '012', name: "Starry Night.exe", cat: 'prints', type: 'print', lens: true, land: true,
      art: 'assets/cl-starry.jpg', zoom: 'assets/cl-starry-zoom.jpg', wall: '#c9cfd8', price: 34, prices: [34, 44, 69],
      blurb: "Van Gogh's night sky, rebuilt one character at a time. From across the room it is the painting. Up close it is all letters.",
      options: { Size: ['16 x 12 in', '24 x 18 in', '32 x 24 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Van Gogh, 1889 (public domain)","Made with Coded Lens, in the Code Sea look"]
    },
    {
      id: 'scream-print', no: '013', name: "The Scream, Thermal", cat: 'prints', type: 'print', lens: true,
      art: 'assets/cl-scream.jpg', zoom: 'assets/cl-scream-zoom.jpg', wall: '#ddd0c2', price: 34, prices: [34, 44, 69],
      blurb: "The Scream as a heat camera would see it, every swirl of the sky typed out in symbols.",
      options: { Size: ['12 x 16 in', '18 x 24 in', '24 x 32 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Munch, 1893 (public domain)","Made with Coded Lens, in the Thermal look"]
    },
    {
      id: 'wave-print', no: '014', name: "The Great Wave, Blueprint", cat: 'prints', type: 'print', lens: true, land: true,
      art: 'assets/cl-wave.jpg', zoom: 'assets/cl-wave-zoom.jpg', wall: '#d3d9df', price: 34, prices: [34, 44, 69],
      blurb: "Hokusai's wave drawn like an engineering plan: white characters on blueprint blue.",
      options: { Size: ['16 x 12 in', '24 x 18 in', '32 x 24 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Hokusai, about 1831 (public domain)","Made with Coded Lens, in the Blueprint look"]
    },
    {
      id: 'shipwreck-print', no: '015', name: "The Shipwreck", cat: 'prints', type: 'print', lens: true, land: true,
      art: 'assets/cl-shipwreck.jpg', zoom: 'assets/cl-shipwreck-zoom.jpg', wall: '#d9cdc4', price: 34, prices: [34, 44, 69],
      blurb: "Turner's storm in thermal colours. The sea is hot, the sky is cold, and all of it is text.",
      options: { Size: ['16 x 12 in', '24 x 18 in', '32 x 24 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Turner, early 1800s (public domain)","Made with Coded Lens, in the Thermal look"]
    },
    {
      id: 'hat-print', no: '016', name: "Woman with a Hat, Vapor", cat: 'prints', type: 'print', lens: true,
      art: 'assets/cl-hat.jpg', zoom: 'assets/cl-hat-zoom.jpg', wall: '#dccfe0', price: 34, prices: [34, 44, 69],
      blurb: "Matisse's loudest portrait in pinks and teals, spelled out in characters.",
      options: { Size: ['12 x 16 in', '18 x 24 in', '24 x 32 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Matisse, 1905 (public domain)","Made with Coded Lens, in the Vaporwave look"]
    },
    {
      id: 'udnie-print', no: '017', name: "Udnie", cat: 'prints', type: 'print', lens: true,
      art: 'assets/cl-udnie.jpg', zoom: 'assets/cl-udnie-zoom.jpg', wall: '#cdd6d4', price: 34, prices: [34, 44, 69],
      blurb: "Picabia's abstract dance, broken into planes of glowing letters.",
      options: { Size: ['12 x 16 in', '18 x 24 in', '24 x 32 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Picabia, 1913 (public domain)","Made with Coded Lens, in the Code Sea look"]
    },
    {
      id: 'launch-print', no: '018', name: "Launch Day", cat: 'prints', type: 'print', lens: true,
      art: 'assets/cl-launch.jpg', zoom: 'assets/cl-launch-zoom.jpg', wall: '#d6cfc6', price: 34, prices: [34, 44, 69],
      blurb: "A rocket leaving the pad, the exhaust plume written in the hottest characters on the page.",
      options: { Size: ['12 x 16 in', '18 x 24 in', '24 x 32 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After SpaceX launch photo (public domain)","Made with Coded Lens, in the Thermal look"]
    },
    {
      id: 'deepfield-print', no: '019', name: "Deep Field", cat: 'prints', type: 'print', lens: true, land: true,
      art: 'assets/cl-deepfield.jpg', zoom: 'assets/cl-deepfield-zoom.jpg', wall: '#c8ccd9', price: 34, prices: [34, 44, 69],
      blurb: "Thousands of galaxies from the Hubble Deep Field, each one a few characters of light.",
      options: { Size: ['16 x 12 in', '24 x 18 in', '32 x 24 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","After Hubble, NASA (public domain)","Made with Coded Lens, in the Code Sea look"]
    },
    {
      id: 'jelly-print', no: '020', name: "Code Sea Jellyfish", cat: 'prints', type: 'print', lens: true,
      art: 'assets/cl-jelly.jpg', zoom: 'assets/cl-jelly-zoom.jpg', wall: '#c5cfd6', price: 34, prices: [34, 44, 69],
      blurb: "Jellyfish rising through dark water, drawn entirely in text. Original Azoki art from the world of Code Sea.",
      options: { Size: ['12 x 16 in', '18 x 24 in', '24 x 32 in'] },
      details: ["Art print on museum-grade matte paper","Frame not included","Free shipping in the US","Every mark in the picture is a letter, number or symbol","Original Azoki art","Made with Coded Lens, in the Sea Night look"]
    },
    {
      /* The make-your-own print. `custom: true` changes its wording: it is made from a picture
         the customer turns into text with Coded Lens and sends in. */
      id: 'custom-print', no: '021', name: 'Your Own Print', cat: 'prints', type: 'print', custom: true,
      art: 'assets/cl-pet.jpg', zoom: 'assets/cl-pet-zoom.jpg', lens: true, wall: '#d9d2e0', price: 45, prices: [45, 59, 79],
      blurb: 'Your photo, or your pet, rebuilt from letters and printed. You make the picture yourself in Coded Lens, the free Azoki tool that turns any photo or clip into text art, then send it in.',
      options: { Size: ['12 x 16 in', '18 x 24 in', '24 x 32 in'] },
      details: ['Made from your own picture', 'Art print on museum-grade matte paper', 'Frame not included', 'Free shipping in the US']
    },
    {
      id: 'shark-tapestry', no: '006', name: 'The Shark', cat: 'tapestries', type: 'tapestry',
      art: 'assets/art-school.jpg', wall: '#cdd3d6', price: 38,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'A shark in text cruising over the reef, big enough to hang behind a desk or a bed.',
      options: { Size: ['51 x 59 in', '59 x 79 in'] }, step: 14,
      details: ['Fabric wall hanging', 'Hangs from pins, clips or a rod']
    },
    {
      id: 'night-tapestry', no: '007', name: 'Lamps Lit', cat: 'tapestries', type: 'tapestry',
      art: 'assets/art-village-night.jpg', wall: '#d2cbbd', price: 38,
      from: 'Hearthside', fromId: 'hearthside',
      blurb: 'Hearthside after dark: windows and street lamps glowing in a moonlit forest.',
      options: { Size: ['51 x 59 in', '59 x 79 in'] }, step: 14,
      details: ['Fabric wall hanging', 'Hangs from pins, clips or a rod']
    },
    {
      id: 'reef-tapestry', no: '008', name: 'The Shallows', cat: 'tapestries', type: 'tapestry', wide: true,
      art: 'assets/art-reef.jpg', wall: '#efe3cd', price: 38,
      from: 'Desktop Reef', fromId: 'desktop-reef',
      blurb: 'Coral gardens in turquoise water, seen from above. The loudest thing in the shop.',
      options: { Size: ['59 x 51 in', '79 x 59 in'] }, step: 14,
      details: ['Fabric wall hanging', 'Hangs from pins, clips or a rod']
    },
    {
      id: 'whale-glow', no: '009', name: 'Whale Glow Box', cat: 'glow', type: 'glow',
      art: 'assets/art-whale.jpg', wall: '#17130f', price: 64, tint: '120, 185, 255',
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'The whale, lit from behind. Off, it is a dark picture in a frame. On, the letters glow like a screen in a dark room.',
      options: { Size: ['Small', 'Large'] }, step: 30,
      details: ['Back-lit shadow box', 'Stands on a shelf or hangs on a wall']
    },
    {
      id: 'bloom-glow', no: '010', name: 'Bloom Glow Box', cat: 'glow', type: 'glow',
      art: 'assets/art-glow.jpg', wall: '#17130f', price: 64, tint: '110, 235, 215',
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'A bioluminescent bloom, the rarest thing in Code Sea, kept in a box you can switch on whenever you like.',
      options: { Size: ['Small', 'Large'] }, step: 30,
      details: ['Back-lit shadow box', 'Stands on a shelf or hangs on a wall']
    },
    {
      id: 'city-crew', no: '011', name: 'City Crewneck', cat: 'embroidery', type: 'crew',
      wall: '#dcd3c1', price: 58,
      blurb: 'A skyline stitched across the chest in a single thread colour, framed like a postage stamp. Pick your city.',
      options: {
        City: ['Atlanta', 'Boston', 'Dallas', 'Las Vegas', 'New York City', 'Toronto'],
        Colour: ['Cream', 'Black'],
        Size: ['S', 'M', 'L', 'XL', '2XL']
      },
      details: ['Embroidered, not printed', 'Six cities to choose from']
    }
  ]
};
