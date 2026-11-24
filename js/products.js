/* The Azoki Market catalogue. Edit this file to change what the shop sells.

   PLACEHOLDERS TO REPLACE BEFORE GOING LIVE
   - Every price, size list and "details" line below is a stand-in. Put in the real ones.
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
      id: 'pod-print', no: '012', name: 'The Pod', cat: 'prints', type: 'print',
      art: 'assets/art-pod.jpg', wall: '#c5ccd6', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'Dolphins crossing the night water in formation, above a reef that has not gone to sleep.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'turtle-print', no: '013', name: 'The Turtle', cat: 'prints', type: 'print',
      art: 'assets/art-turtle.jpg', wall: '#d6cdb8', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'One sea turtle, lit like a lantern, alone in a great deal of dark. The emptiest print in the shop, on purpose.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'open-print', no: '014', name: 'Open Water', cat: 'prints', type: 'print',
      art: 'assets/art-open.jpg', wall: '#dccfc4', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'A turtle, two schools of fish and something large and red, all passing each other at once.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included']
    },
    {
      id: 'shark-print', no: '015', name: 'The Shark', cat: 'prints', type: 'print',
      art: 'assets/art-school.jpg', wall: '#cdd3d6', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'The shark over the reef, at a size that fits a frame instead of a whole wall.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included', 'Also comes as a tapestry, No. 006']
    },
    {
      id: 'glow-print', no: '016', name: 'Night Bloom', cat: 'prints', type: 'print',
      art: 'assets/art-glow.jpg', wall: '#c4cdc9', price: 24,
      from: 'Code Sea', fromId: 'codesea',
      blurb: 'The bioluminescent bloom on paper: the rarest scene in Code Sea, without the light behind it.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in'] }, step: 6,
      details: ['Art print, ready for a standard frame', 'Frame not included', 'Also comes as a glow box, No. 010']
    },
    {
      /* The make-your-own print. `custom: true` changes its wording: it is made from a picture
         the customer turns into text with Coded Lens and sends in. */
      id: 'custom-print', no: '017', name: 'Your Own Print', cat: 'prints', type: 'print', custom: true,
      art: 'assets/art-custom.svg', wall: '#d9d2e0', price: 32,
      blurb: 'Your photo, rebuilt from letters and printed. You make the picture yourself in Coded Lens, the free Azoki tool that turns any photo or clip into text art, then send it in.',
      options: { Size: ['11 x 14 in', '12 x 18 in', '16 x 20 in', '18 x 24 in', '24 x 36 in'] }, step: 6,
      details: ['Made from your own picture', 'Art print, ready for a standard frame', 'Frame not included']
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
