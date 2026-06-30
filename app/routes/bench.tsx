import { Card, CardHeader, CardTitle, CardContent } from '~/components/Common/Card';

export function Bench() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bench</h1>
        <p className="text-muted-foreground mt-2">Track bench schedules</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bench Records</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No bench records</p>
        </CardContent>
      </Card>
    </div>
  );
}
