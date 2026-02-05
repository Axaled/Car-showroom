import React from 'react';
import { Canvas } from '@react-three/fiber';
import { AppProvider } from './store.jsx';
import ModelInfo from './components/ModelInfo.jsx';
import Scene from './components/Scene.jsx';
import ChatUI from './components/ChatUI.jsx';
import './App.css';

// App Component - Layout
export default function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <div className="canvas-container">
          <ModelInfo />
          <Canvas shadows>
            <Scene />
          </Canvas>
        </div>
        <ChatUI />
      </div>
    </AppProvider>
  );
}
