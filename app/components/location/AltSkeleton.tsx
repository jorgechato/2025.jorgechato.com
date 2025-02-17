export function AltSkeleton({ of }: { of: string }) {
  return (
    <>
      <div className="font-h1 font-bold mt-4 text-lg">
        <span className="text-zinc-500 dark:text-zinc-400">
          {of}
          {' '}
          is currently in
          {' '}
        </span>
        <div className="animate-pulse h-4 w-32 p-4 bg-zinc-700 dark:bg-zinc-200 rounded inline-block align-middle"></div>
      </div>
      <div className="animate-pulse h-3 w-40 p-1 bg-zinc-300 dark:bg-zinc-600 rounded inline-block align-middle"></div>
    </>
  );
}
