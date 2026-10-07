import Asset from "./prototype-asset";

export type PrototypeTab = "home" | "products" | "all";
const tabs: { id: PrototypeTab; label: string }[] = [
  { id: "home", label: "홈" },
  { id: "products", label: "금융상품" },
  { id: "all", label: "전체" },
];
const variantNodes = { home: "302:128", products: "302:202", all: "302:239" };

export default function PrototypeNavigation({ selected, interactive = true, onSelect }: { selected: PrototypeTab; interactive?: boolean; onSelect: (tab: PrototypeTab) => void }) {
  return (
    <nav className="prototype-navigation" aria-label="앱 하단 메뉴" data-figma-node={variantNodes[selected]}>
      {tabs.map(({ id, label }) => {
        const active = selected === id;
        const content = <>
          <span className={`prototype-nav-icon${id === "home" ? " prototype-home-icon" : ""}`}>
            {id === "home" ? <><Asset file={active ? "home.svg" : "home-inactive.svg"}/><Asset file={active ? "home-door.svg" : "home-door-inactive.svg"}/></> : <Asset file={id === "products" ? (active ? "products-active.svg" : "products.svg") : (active ? "menu-active.svg" : "menu.svg")}/>}
          </span><span>{label}</span>
        </>;
        const className = `prototype-nav-item${active ? " is-active" : ""}`;
        return interactive ? <button key={id} type="button" className={className} aria-pressed={active} onClick={() => onSelect(id)}>{content}</button> : <div key={id} className={className}>{content}</div>;
      })}
    </nav>
  );
}
