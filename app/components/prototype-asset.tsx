/* eslint-disable @next/next/no-img-element -- Preserve local Figma SVG dimensions. */
export default function PrototypeAsset({ file, className = "", alt = "" }: { file: string; className?: string; alt?: string }) {
  return <img src={`/prototype/${file}`} className={className} alt={alt} draggable={false} />;
}
