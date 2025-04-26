
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-agro-blue mb-4">About South Sudan Agro-Marketplace</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          An initiative of Quantum Consult, trusted by over 103 NGOs and 73 companies in under 7 years.
        </p>
      </div>

      {/* Mission & Vision */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-agro-blue">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            The initiative strives for a ready market for a highly productive farmer in a vibrant agri-business sector for a food secure South Sudan.
          </p>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="background" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2">
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="aims">Main Aims</TabsTrigger>
          <TabsTrigger value="impact">Expected Impact</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>

        <TabsContent value="background" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <p>Whereas South Sudan has been touted as a potential food basket in Africa given about 85% of its land is arable only 4% is under cultivation, agriculture is largely traditional characterized with low productivity thus having the food insecure country with over 60% food insecure rely on food imports (about 78%) to meet the high domestic demand.</p>
                <p className="mt-4">The nascent agriculture sector is yet to blossom into a vibrant and viable commercial sector. Starved of critical government prioritization and investment, the sector has to therefore rely on private sector ingenuity and relief agencies to realize its full potential.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aims">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4 list-disc pl-6">
                <li>Ease farmer access to markets through e-commerce website, App, and text-based platforms</li>
                <li>Improve farmer incomes through increased trade velocity and volume</li>
                <li>Build and strengthen farmer productive capacity</li>
                <li>Early warning reporting platform for disease and pest outbreaks</li>
                <li>Create direct and auxiliary employment opportunities</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4 list-disc pl-6">
                <li>Easy farmer access to markets</li>
                <li>Improved farmer productive capacity</li>
                <li>Enhanced access to extension and support services</li>
                <li>Disease and pest outbreak prevention</li>
                <li>Increased aggregate agriculture productivity</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management">
          <Card>
            <CardContent className="pt-6">
              <p>The initiative is currently run by a dedicated team of five professionals:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Team Leader</li>
                <li>Project Manager</li>
                <li>IT Officer</li>
                <li>Communications Officer</li>
                <li>Finance Officer</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Section */}
      <Card className="mt-8 bg-agro-blue text-white">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Partnership Opportunities</h3>
          <p>We welcome any partnership that shall see the initiative grow and achieve its objectives. Together, for the South Sudanese farmer.</p>
          <div className="mt-4">
            <p>Email: info@ssd-agromarkeplace.org</p>
            <p>Mobile: +211 922 423 065</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
