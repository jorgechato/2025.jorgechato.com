export default function ProfilePicture() {
  return (
    <div className="text-center mb-8 relative group">
      <img
        src="/profile.webp"
        loading="lazy"
        className="mx-auto w-44 rounded-full aspect-square relative z-10 cursor-cell group-hover:scale-105 transition-scale duration-300"
        alt="Avatar"
      />
      <img
        src="/profile.webp"
        loading="lazy"
        className="mx-auto w-52 rounded-full aspect-square absolute top-0 left-0 blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-300"
        alt="Avatar blurred"
      />
    </div>
  );
}
