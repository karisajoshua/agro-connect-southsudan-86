import { useBusinessStats } from "@/hooks/useBusinesses";
import { useCooperativeStats } from "@/hooks/useCooperatives";
import { useDiseaseReportStats } from "@/hooks/useDiseaseReports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { CHART_COLORS, CHART_COLOR_ARRAY } from "@/constants/chartColors";

const Analytics = () => {
  const { data: businessStats, isLoading: businessLoading } = useBusinessStats();
  const { data: coopStats, isLoading: coopLoading } = useCooperativeStats();
  const { data: diseaseStats, isLoading: diseaseLoading } = useDiseaseReportStats();

  const isLoading = businessLoading || coopLoading || diseaseLoading;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">Comprehensive platform insights</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{businessStats?.totalBusinesses || 0}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {businessStats?.approvedBusinesses || 0} approved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cooperatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{coopStats?.totalCooperatives || 0}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {coopStats?.totalMembers || 0} members
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Disease Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{diseaseStats?.totalReports || 0}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {diseaseStats?.criticalReports || 0} critical
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {(businessStats?.pendingBusinesses || 0) + (diseaseStats?.pendingReports || 0)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Requires attention</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Business Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business by Category</CardTitle>
            <CardDescription>Distribution across sectors</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={businessStats?.categoryData || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {businessStats?.categoryData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business by Location</CardTitle>
            <CardDescription>Geographic distribution</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={businessStats?.locationData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={CHART_COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Reports by Type</CardTitle>
            <CardDescription>Most reported diseases</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={diseaseStats?.diseaseTypeData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={CHART_COLORS.coral} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Reports by Location</CardTitle>
            <CardDescription>Geographic outbreak patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={diseaseStats?.locationData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={CHART_COLORS.warm} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Business Registrations</CardTitle>
            <CardDescription>Registration trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={businessStats?.monthlyTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke={CHART_COLORS.primary} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
