# GrapeJS Editor - Modular Architecture

This directory contains a modular implementation of the GrapeJS editor with clean separation of concerns.

## Directory Structure

```
app/grape/
├── components/           # React components
│   ├── LeftSidebar.tsx   # Left sidebar with blocks and layers
│   ├── RightSidebar.tsx  # Right sidebar with style controls
│   ├── EditorHeader.tsx  # Editor header with device info
│   └── blocks.ts         # Block definitions for the editor
├── hooks/               # Custom React hooks
│   ├── useEditor.ts     # Editor initialization and lifecycle
│   ├── useComponentManagement.ts # Component events and lifecycle
│   ├── useDeviceManagement.ts    # Device switching logic
│   ├── useStyleManagement.ts     # Style updates and operations
│   └── index.ts         # Hook exports
├── config/              # Configuration files
│   └── editorConfig.ts  # GrapeJS editor configuration
├── types/               # TypeScript type definitions
│   └── index.ts         # All types and interfaces
├── utils/               # Utility functions
│   └── helpers.ts       # Helper functions for UID, device, and style operations
├── styles/              # CSS styles
│   └── editor.css       # Editor-specific styles
├── page.tsx             # Main editor page component
└── README.md            # This file
```

## Key Components

### Hooks

- **`useEditor`**: Manages GrapeJS editor initialization, commands, and lifecycle
- **`useComponentManagement`**: Handles component creation, selection, deselection, and removal events
- **`useDeviceManagement`**: Manages device switching and related functionality
- **`useStyleManagement`**: Handles style updates and component style operations

### Components

- **`EditorHeader`**: Displays current device information and device manager panel
- **`LeftSidebar`**: Contains blocks and layers management
- **`RightSidebar`**: Contains style controls and property editors

### Utilities

- **`helpers.ts`**: Contains utility functions for:
  - UID generation
  - Device key mapping
  - Style value parsing
  - Default style values

### Types

- **`ComponentStyles`**: Interface for storing component styles by device
- **`StyleValues`**: Interface for style input values
- **`DeviceKey`**: Type for device breakpoints (lg, md, sm)
- **`DeviceName`**: Type for device names (Desktop, Tablet, Mobile)

## Benefits of Modular Architecture

1. **Separation of Concerns**: Each hook and component has a single responsibility
2. **Reusability**: Hooks can be reused across different components
3. **Testability**: Smaller, focused functions are easier to test
4. **Maintainability**: Changes to specific functionality are isolated
5. **Readability**: Code is more organized and easier to understand
6. **Type Safety**: Centralized types ensure consistency across the application

## Usage

The main `page.tsx` file demonstrates how to use all the modular components together:

```tsx
export default function EditorPage() {
  // State management
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [currentDevice, setCurrentDevice] = useState<DeviceName>("Desktop");
  const [componentStyles, setComponentStyles] = useState<ComponentStyles>({});
  const [styleValues, setStyleValues] = useState<StyleValues>(getDefaultStyleValues());

  // Custom hooks
  const { editor } = useEditor();
  const { handleDeviceChange } = useDeviceManagement({...});
  const { updateComponentStyle, handleSliderChange } = useStyleManagement({...});

  // Component management
  useComponentManagement({...});

  return (
    <div className="h-screen flex flex-col">
      <EditorHeader currentDevice={currentDevice} />
      {/* Editor content */}
    </div>
  );
}
```

## Adding New Features

To add new features:

1. **New hooks**: Create in `hooks/` directory and export from `hooks/index.ts`
2. **New components**: Create in `components/` directory
3. **New utilities**: Add to `utils/helpers.ts` or create new utility files
4. **New types**: Add to `types/index.ts`
5. **New styles**: Add to `styles/editor.css`

This modular structure makes it easy to extend the editor with new functionality while maintaining clean, organized code.
