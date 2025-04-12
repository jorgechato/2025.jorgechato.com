import { useTheme } from '@/components/core/ThemeProvider';
import { Model as Bridge } from '@/components/models/Bridge';
import { Model as Door } from '@/components/models/Door';
import { Model as Floor } from '@/components/models/Island';
import { Model as Rooster } from '@/components/models/Rooster';
import { Model as Sakura } from '@/components/models/Sakura';
import { Model as Soju } from '@/components/models/Soju';
import { Model as Torii } from '@/components/models/Torii';
import { CameraControls, Center, MeshPortalMaterial, OrbitControls, RoundedBox, Text, Text3D, useTexture } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { RoundedPlaneGeometry } from 'maath/geometry';
import React from 'react';
import { Profile } from '~/utils/content';

extend({ RoundedPlaneGeometry });

const GOLDENRATIO = 1.61803398875;
const ROUND = 0.05;

function FrameImage({ scale }: { scale: number[] }) {
  const texture = useTexture(Profile.IMAGE);

  return (
    <mesh position={[0, 0.4, 0.001]}>
      <roundedPlaneGeometry args={[...scale, 0.25]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

interface FrameProps {
  name: string;
  bg: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}
function Frame({ name, bg, width = 1, height = GOLDENRATIO, children, ...props }: FrameProps) {
  const { resolvedTheme } = useTheme();

  return (
    <mesh {...props}>
      {/* frame */}
      <mesh>
        <roundedPlaneGeometry args={[width, height, ROUND]} />
        <MeshPortalMaterial>
          {children}

          {/* Light */}
          <ambientLight intensity={resolvedTheme === 'dark' ? 0.8 : 1.5} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={resolvedTheme === 'dark' ? 0.8 : 1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* BG Color */}
          <color attach="background" args={[resolvedTheme === 'dark' ? '#27272a' : '#fff']} />

          <OrbitControls />
        </MeshPortalMaterial>
        <Center>
          <Text3D
            font="/figtree.json"
            material-color={resolvedTheme === 'dark' ? bg : 'black'}
            size={0.06}
            height={0.025}
          >
            {name}
          </Text3D>
        </Center>
      </mesh>

      {/* border */}
      <mesh>
        <RoundedBox
          args={[width, height, 0]} // width, height, depth
          radius={ROUND}
          smoothness={4}
          position={[0, 0, -0.05]}
        >
          <meshBasicMaterial attachArray="material" color={resolvedTheme === 'dark' ? bg : 'black'} />
        </RoundedBox>
      </mesh>

      {/* image */}
      <FrameImage width={0.5} height={0.5} scale={[0.5, 0.5]} bg={bg} />
    </mesh>
  );
}

// Main component that sets up the Canvas and includes our Square
export function ThreeD({ name, bg }: { name: string; bg: string }) {
  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 1.5] }} gl={{ localClippingEnabled: true }} shadows>
        <Frame name={name} bg={bg} width={1} height={GOLDENRATIO}>
          <Floor position={[-0.1, -0.7, -0.2]} scale={[0.6, 0.6, 0.6]} rotation={[0, -Math.PI / 2, 0]} />
          <Rooster position={[-0.4, -0.73, -0.3]} scale={[0.025, 0.025, 0.025]} rotation={[0, -Math.PI / 2 + 0.6, 0]} />
          <Torii position={[0.55, -0.38, -0.20]} scale={[0.5, 0.5, 0.5]} rotation={[0, Math.PI, 0]} />
          <Door position={[-0.07, -0.32, -0.3]} scale={[0.009, 0.009, 0.005]} rotation={[0, Math.PI / 7, 0]} />
          <Sakura position={[-0.5, -0.75, -0.3]} scale={[0.002, 0.002, 0.002]} rotation={[0, -Math.PI / 3, 0]} />
          <Soju position={[0.19, -0.56, -0.24]} scale={[0.05, 0.05, 0.05]} rotation={[0, Math.PI, 0]} />
          <Bridge position={[0.29, -0.49, -0.15]} scale={[0.00026, 0.0002, 0.0002]} rotation={[0, 0.1, -0.25]} />
        </Frame>

        <CameraControls
          makeDefault
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2}
          minDistance={1}
          maxDistance={2}
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
