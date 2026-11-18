# MAA DURGA HD VIDEOGRAPHY — Wedding Booking Website

## Run locally
1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the localhost URL printed by Vite.

## Current booking configuration
- WhatsApp destination: +91 81188 77270
- Groom Traditional: ₹27,000 (1 day drone)
- Groom Cinematic: ₹55,000 (2 days drone)
- Bride Traditional: ₹25,000 (1 day drone)
- Bride Cinematic: ₹55,000 (2 days drone)
- Optional pre-wedding shoot: +₹8,000
- Events include Tilak, Haldi, Mehndi, Devpujan (Dagar Puji), Wedding Ceremony; Bride side also includes Reception.

## WhatsApp behaviour
When the client presses "Send Booking on WhatsApp", the client's WhatsApp opens with the booking details pre-filled to the studio number. The client must press Send. This is not an automatic background message; that requires the WhatsApp Business Platform/API.

## Replace sample gallery media
Open `src/App.jsx` and search for `REPLACE PHOTO` or `REPLACE VIDEO` comments.
- The three sample photo URLs are in the `<img src="...">` attributes. Replace each URL with your own hosted photo URL, or place local images in `public/gallery/photos/` and use paths such as `/gallery/photos/my-photo.jpg`.
- The two video cards are marked `REPLACE VIDEO`. Replace each placeholder `<div>` with a `<video controls>` element and a source path such as `/gallery/videos/my-wedding.mp4`. Put local MP4 files in `public/gallery/videos/`.

## Important pricing note
Both Cinematic packages are set to ₹55,000 based on the latest requested update. Confirm if Bride Cinematic should remain ₹35,000 instead.
