# KYC Verification Website - Design Guidelines

## Design Approach: Material Design System
**Rationale:** KYC verification demands trust, clarity, and efficiency. Material Design provides structured form patterns, clear visual hierarchy, and professional components ideal for secure document verification workflows.

**Key References:** Google Pay, PhonePe verification flows, government service portals

## Core Design Principles
1. **Trust Through Clarity:** Clean, uncluttered interfaces that build user confidence
2. **Guided Progress:** Clear visual feedback at every step of verification
3. **Mobile-First:** Optimized for users completing KYC on smartphones
4. **Security Indicators:** Professional aesthetic that conveys data protection

## Typography
- **Primary Font:** Inter (Google Fonts)
- **Secondary Font:** System UI fallback
- **Hierarchy:**
  - Page Titles: text-3xl font-bold
  - Section Headers: text-xl font-semibold
  - Step Labels: text-lg font-medium
  - Body Text: text-base
  - Helper Text: text-sm text-gray-600

## Layout System
**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16
- Form sections: p-8
- Card padding: p-6
- Element spacing: gap-4, gap-6
- Container max-width: max-w-4xl mx-auto

## Component Library

### Multi-Step Form Structure
- Horizontal stepper with 4 steps: Aadhar → PAN → Photo → Signature
- Active step highlighted, completed steps with checkmark icons
- Progress bar showing completion percentage

### Document Upload Cards
- Large drop zones (min-h-48) with dashed borders
- Upload states: Empty, Hover, Uploading, Completed
- Clear icons (upload cloud, document, camera) from Heroicons
- Image preview thumbnails with remove button overlay
- File size/format requirements below each uploader

### Verification Completion Page
- Success checkmark icon (large, centered)
- "Verification Complete" headline
- 2×2 grid displaying uploaded document thumbnails
- Each document labeled: "Aadhar Front", "Aadhar Back", "PAN Card", "Photo", "Signature"
- Download/print verification summary button
- Reference number display

### Navigation
- Sticky header with logo and "Secure KYC Verification" title
- "Previous" and "Next/Submit" buttons at bottom of each step
- Disabled state for Next button until step validation passes

### Form Inputs
- Signature pad: Canvas-based drawing area with clear/redo controls
- Camera capture: Native device camera integration with fallback file upload
- Validation messages inline below each field

## Icons
**Library:** Heroicons via CDN
- Upload: cloud-arrow-up
- Document: document-text
- Camera: camera
- Signature: pencil-square
- Success: check-circle
- Security: shield-check

## Accessibility
- ARIA labels for all upload zones
- Keyboard navigation through form steps
- High contrast text (minimum 4.5:1 ratio)
- Clear error messages with icons
- Focus indicators on all interactive elements

## Images
**Hero Section:** No hero image - immediate form entry for efficiency
**Trust Indicators:** Small security badge icons (SSL, Data Protection) in header
**Document Previews:** Actual uploaded images displayed as thumbnails in completion summary

## Mobile Optimization
- Single column layout on mobile
- Stepper converts to vertical on screens <768px
- Touch-friendly upload zones (min 44px tap targets)
- Bottom sheet pattern for signature pad on mobile

## Animations
Use sparingly for feedback only:
- Upload progress indicators
- Success checkmark animation on completion page
- Smooth transitions between form steps (300ms ease)