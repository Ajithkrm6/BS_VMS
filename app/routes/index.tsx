import { Card, CardHeader, CardTitle, CardContent } from '~/components/Common/Card';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to BS-VMS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Opportunities', value: '42' },
          { title: 'Active Opportunities', value: '38' },
          { title: 'Past Opportunities', value: '3' },
          { title: 'Pending Actions', value: '5' },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent activity</p>
        </CardContent>
      </Card>
    </div>
  );
}
