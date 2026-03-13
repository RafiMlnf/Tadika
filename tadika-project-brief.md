# Sirkel Archive -- Project Brief & Architecture

## 1. Project Overview

  -----------------------------------------------------------------------
  Item                                Detail
  ----------------------------------- -----------------------------------
  Project Name                        Tadika

  Purpose                             Website untuk menyimpan
                                      kenangan sirkel (foto, video, trip,
                                      dan archive)

  Target Users                        ±20 anggota sirkel

  Design Goal                         tba

  Media Volume                        ±1k foto dan video

  Access Scope                        Internal sirkel
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 2. Core Objectives

-   Menyimpan kenangan trip dan hangout sirkel
-   Galeri foto dan video dengan kategori
-   Upload media oleh anggota
-   Navigasi sederhana tetapi konten banyak, pakai page juga bisa
-   Performa cepat walaupun media ribuan

------------------------------------------------------------------------

# 3. Tech Stack

  Layer            Technology              Purpose
  ---------------- ----------------------- ------------------------------
  Frontend         Next.js                 Framework utama
  Styling          Tailwind CSS            Styling cepat dan clean
  Animation        Framer Motion           Animasi UI
  Gallery Layout   react-photo-album       Masonry gallery layout
  Media Storage    Cloudinary              Penyimpanan foto/video + CDN
  Hosting          Vercel                  Deploy dan hosting
  Data Storage     JSON / lightweight DB   Metadata media

------------------------------------------------------------------------

# 4. Website Structure

  Page             Function
  ---------------- ------------------------------------
  Home             Landing page dan intro sirkel
  Gallery          Daftar kategori galeri
  Gallery Detail   Media dalam kategori
  Trips            Cerita perjalanan
  Archive          Meme, screenshot, nostalgia
  Map              Peta tempat yang pernah dikunjungi
  Upload           Upload media oleh anggota

------------------------------------------------------------------------

# 5. Gallery Categories

  Category    Content
  ----------- ------------------
  Pantai      Trip pantai
  Gunung      Hiking / camping
  Kota        Hangout kota
  Random      Momen random
  Throwback   Foto lama

------------------------------------------------------------------------

# 6. Media Storage Structure

    cloudinary
       /sirkel-gallery
          /pantai
          /gunung
          /kota
          /random

Example URL

    https://res.cloudinary.com/sirkel/pantai/img1.jpg

------------------------------------------------------------------------

# 7. Upload System

## Upload Flow

    User
     ↓
    Upload Form (Frontend)
     ↓
    Next.js API Route
     ↓
    Upload to Cloudinary
     ↓
    Receive Media URL
     ↓
    Save metadata
     ↓
    Show in gallery

------------------------------------------------------------------------

# 8. Media Metadata Structure

Example JSON

``` json
{
 "id": "001",
 "title": "Pantai Anyer",
 "category": "pantai",
 "url": "https://res.cloudinary.com/.../img1.jpg",
 "uploader": "username",
 "date": "2026-03-14"
}
```

------------------------------------------------------------------------

# 9. Routing Structure

  Route             Description
  ----------------- --------------------
  /                 Homepage
  /gallery          Gallery categories
  /gallery/pantai   Pantai album
  /gallery/gunung   Gunung album
  /upload           Upload page

------------------------------------------------------------------------

# 10. Project Folder Structure

    /app
       /gallery
       /upload
    /components
       GalleryGrid
       UploadForm
       Navbar
    /lib
       cloudinary
    /data
       media.json
    /public

------------------------------------------------------------------------

# 11. Gallery System

  Feature             Description
  ------------------- --------------------------------
  Masonry Layout      Pinterest-style layout
  Pagination          20--40 media per page
  Lazy Loading        Load media saat terlihat
  Thumbnail Preview   Load gambar kecil dulu
  Modal Viewer        Klik foto untuk resolusi besar

------------------------------------------------------------------------

# 12. Performance Optimization

  Technique            Purpose
  -------------------- ----------------------------
  Lazy Loading         Kurangi initial load
  Pagination           Hindari load ratusan media
  CDN Delivery         Akses media cepat
  Image Optimization   Resize otomatis

------------------------------------------------------------------------

# 13. System Architecture Diagram

    User Browser
          │
          ▼
    Next.js Frontend
          │
          ├── Request gallery metadata
          │
          ▼
    Cloudinary CDN
          │
          ▼
    Images / Videos
          │
          ▼
    Masonry Gallery Render

------------------------------------------------------------------------

# 14. Upload Architecture

    User Upload
         │
         ▼
    Upload Form
         │
         ▼
    Next.js API Route
         │
         ▼
    Cloudinary Upload API
         │
         ▼
    Media URL Returned
         │
         ▼
    Save Metadata
         │
         ▼
    Display in Gallery

------------------------------------------------------------------------

# 15. Target Capacity

  Resource         Estimate
  ---------------- -----------------
  Photos           5,000 -- 10,000
  Videos           ±100
  Users            20
  Categories       5 -- 10
  Media per page   20 -- 30

------------------------------------------------------------------------

# 16. Optional Features

  Feature          Function
  ---------------- --------------------------
  Random Memory    Generate foto random
  Trip Timeline    History perjalanan
  Memory Counter   Hari sejak trip terakhir
  Location Map     Peta tempat perjalanan

------------------------------------------------------------------------

# 17. Final Architecture Summary

    Frontend
    Next.js

    Hosting
    Vercel

    Media Storage
    Cloudinary

    Gallery Layout
    Masonry Grid

Website ini dirancang untuk: - ribuan foto - upload oleh anggota -
performa cepat - biaya 0 (free tier)
