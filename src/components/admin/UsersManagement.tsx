import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      phone: '+256701234567',
      macAddress: '00:1B:44:11:3A:B7',
      currentPlan: 'Flexi Surf',
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      isActive: true,
      dataUsed: 15.7,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      username: 'mary_k',
      email: 'mary@example.com',
      phone: '+256709876543',
      macAddress: '00:1B:44:11:3A:C8',
      currentPlan: 'Endless Surf',
      expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      isActive: true,
      dataUsed: 45.2,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      username: 'samuel_m',
      email: 'samuel@example.com',
      phone: '+256705555555',
      macAddress: '00:1B:44:11:3A:D9',
      currentPlan: 'Instant Surf',
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      isActive: true,
      dataUsed: 2.1,
      createdAt: new Date('2024-02-01')
    },
    {
      id: '4',
      username: 'grace_n',
      email: 'grace@example.com',
      phone: '+256703333333',
      macAddress: '00:1B:44:11:3A:EA',
      currentPlan: 'Flexi Surf',
      expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isActive: false,
      dataUsed: 8.9,
      createdAt: new Date('2024-01-20')
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleDisconnectUser = (userId: string) => {
    // Implement user disconnection logic
    console.log('Disconnecting user:', userId);
  };

  const handleExtendAccess = (userId: string) => {
    // Implement access extension logic
    console.log('Extending access for user:', userId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Users Management</h1>
          <p className="text-muted-foreground">Manage user accounts and access</p>
        </div>
        <Button variant="premium">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by username, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="instant">Instant Surf</SelectItem>
                <SelectItem value="flexi">Flexi Surf</SelectItem>
                <SelectItem value="endless">Endless Surf</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Used</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground font-mono">{user.macAddress}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.currentPlan}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.dataUsed} GB</TableCell>
                    <TableCell>
                      <span className={user.expiresAt < new Date() ? 'text-destructive' : ''}>
                        {user.expiresAt.toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Username</Label>
                                <Input value={user.username} readOnly />
                              </div>
                              <div>
                                <Label>Email</Label>
                                <Input value={user.email} readOnly />
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <Input value={user.phone} readOnly />
                              </div>
                              <div>
                                <Label>MAC Address</Label>
                                <Input value={user.macAddress} readOnly />
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleExtendAccess(user.id)}
                                >
                                  Extend Access
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleDisconnectUser(user.id)}
                                >
                                  Disconnect
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDisconnectUser(user.id)}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};