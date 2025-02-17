export function MarkerSkeleton() {
  return (
    <div className="svg-mask w-[230.625px] h-[307.2px] max-w-full color-transparent m-auto
                object-center bg-cover scale-100
                duration-500 transition-scale group hover:scale-105 cursor-cell"
    >
      <div className="animate-pulse h-full w-full bg-zinc-300 dark:bg-zinc-800 rounded inline-block align-middle"></div>
    </div>
  );
}
