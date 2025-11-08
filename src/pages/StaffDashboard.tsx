import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, CheckCircle, User, 
  Star, DollarSign, Coffee, Bell,
  SettingsIcon
} from 'lucide-react';
import SettingsMenu from '@/components/SettingsMenu';

const StaffDashboard = () => {
  const [todayStats] = useState({
    appointments: 8,
    completed: 5,
    earnings: 2400,
    rating: 4.8
  });

  const [upcomingAppointments] = useState([
    { 
      id: 1, 
      customer: 'Sarah Johnson', 
      service: 'Deep Tissue Massage', 
      time: '10:00 AM', 
      duration: '60 min',
      status: 'confirmed',
      customerNote: 'First time client, prefers medium pressure'
    },
    { 
      id: 2, 
      customer: 'Mike Chen', 
      service: 'Hair Cut & Style', 
      time: '11:30 AM', 
      duration: '45 min',
      status: 'confirmed',
      customerNote: 'Regular client, usual style'
    },
    { 
      id: 3, 
      customer: 'Emily Davis', 
      service: 'Facial Treatment', 
      time: '2:00 PM', 
      duration: '90 min',
      status: 'pending',
      customerNote: 'Sensitive skin, use gentle products'
    }
  ]);

  const [completedServices] = useState([
    { id: 1, customer: 'Lisa Wang', service: 'Manicure', time: '9:00 AM', rating: 5, tip: 200 },
    { id: 2, customer: 'John Smith', service: 'Hair Wash', time: '8:30 AM', rating: 4, tip: 100 }
  ]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your schedule for today</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Coffee className="w-4 h-4 mr-2" />
              Break Time
            </Button>
            <SettingsMenu/>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.appointments}</div>
              <p className="text-xs text-muted-foreground">{todayStats.completed} completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{todayStats.earnings}</div>
              <p className="text-xs text-muted-foreground">Including tips</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.rating}</div>
              <p className="text-xs text-muted-foreground">Based on recent reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Work Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.5h</div>
              <p className="text-xs text-muted-foreground">of 8h scheduled</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled services for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-600/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.customer}</p>
                            <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-muted-foreground">{appointment.duration}</p>
                        </div>
                      </div>
                      
                      {appointment.customerNote && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Note:</span> {appointment.customerNote}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-amber-600">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Services Today</CardTitle>
                <CardDescription>Services you've completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{service.customer}</p>
                          <p className="text-sm text-muted-foreground">{service.service} • {service.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{service.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Tip: ₹{service.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service History</CardTitle>
                <CardDescription>Your past work and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">Service History</p>
                  <p className="text-sm">Your complete work history will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your professional profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <User className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">Staff Profile</p>
                  <p className="text-sm">Profile management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;