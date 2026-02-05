# Mercedes-Benz 3D Showroom Assistant

## Project Overview
This project is a high-end **3D Virtual Showroom** for Mercedes-Benz vehicles (EQS and EQE), built with **React**, **Vite**, and **React Three Fiber (R3F)**. It features an interactive 3D scene paired with a context-aware AI Assistant UI.

## Technology Stack
- **Framework**: React + Vite
- **3D Engine**: @react-three/fiber (Three.js wrapper)
- **3D Utilities**: @react-three/drei (Environment, OrbitControls, useGLTF, Center, etc.)
- **State Management**: Zustand (via `store.jsx`)
- **Styling**: Pure CSS with CSS Modules approach (Glassmorphism, Luxury aesthetic)

## Key Features

### 1. 3D Showroom (`src/components/ShowroomStage.jsx`)
- **Environment**: Custom "Luxury Dark" stage with black marble floor (`MeshReflectorMaterial`), gold accents, and cinematic lighting.
- **Models**:
  - **Mercedes EQS**: Scale `0.32`, Rotated `90°`.
  - **Mercedes EQE**: Scale `0.7`, Rotated `-90°`.
  - Managed in `src/components/CarModel.jsx` with independent `<Center>` logic to ensure perfect positioning.

### 2. Interactive Features
- **Model Switching**: Users can toggle between EQS and EQE models. The state is preserved in `store.jsx`.
- **Color Customization**: Real-time body color changing.
  - *Implementation*: `CarModel.jsx` traverses the GLTF scene graph and identifies body parts using keywords (`paint`, `body`, `kapot`, `door`, `bump`, etc.) to apply the selected color.
- **Camera Controls**:
  - **Exterior View**: Orbit controls for 360° inspection.
  - **Interior View**: Fixed camera position inside the cabin.
  - Managed by `src/components/SceneController.jsx`.

### 3. AI Assistant UI (`src/components/ChatUI.jsx`)
- **Design**: Premium "Glassmorphism" UI with blur effects, pill-shaped inputs, and Mercedes branding (Inverted Logo).
- **Functionality**:
  - Displays context-aware messages (e.g., "Switching to EQE...").
  - interactive "Chips" (Carousel) for quick actions (Colors, Views, Models).

## Logic & Architecture

### Global State (`src/store.jsx`)
Stores the application state:
- `currentModel`: 'EQS' | 'EQE'
- `carColor`: Hex string (e.g., '#000000')
- `cameraView`: 'exterior' | 'interior'
- `chatMessages`: Array of chat history.

### Directory Structure
```
/public
  /models       # Uncompressed GLTF/GLB models (EQS/EQE)
  /assets       # Static assets (Logos, textures)
/src
  /components   # React components (Scene, UI, Logic)
  App.jsx       # Main entry point merging 3D Canvas and HTML UI
  App.css       # Global styles (reset, variables, layout)
```

## Setup & Run
1. `npm install`
2. `npm run dev`

## Notes for LLMs
- **Model Handling**: When adding features to cars, strictly differentiate between EQS and EQE in `CarModel.jsx` as their scales and orientations differ.
- **Material Detection**: The color changer relies on material name heuristics. If adding a new model, check its `scene.gltf` for material naming conventions (e.g., "Body" vs "Kapot").
