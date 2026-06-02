import TrainingSidebar from "@/components/TrainingSidebar";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen pt-16">
      <TrainingSidebar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
