const PlatformIntro = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50/20 via-background to-blue-50/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/20 py-12 rounded-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Every Feature. Every Department.{" "}
            <span className="text-blue-600">
              Every Industry.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete platform that grows with your business needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformIntro;