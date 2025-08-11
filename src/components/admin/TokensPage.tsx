import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Ticket, Calendar, Phone, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface TokenData {
  id: string;
  code: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  plan_name: string;
  plan_price: number;
  duration_days: number;
  created_at: string;
  activated_at: string | null;
  expires_at: string | null;
  is_active: boolean;
  is_used: boolean;
}

export const TokensPage = () => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('vouchers')
        .select(`
          id,
          code,
          created_at,
          activated_at,
          expires_at,
          is_active,
          is_used,
          profiles!vouchers_user_id_fkey (
            phone_number,
            first_name,
            last_name
          ),
          plans!vouchers_plan_id_fkey (
            name,
            price_ugx,
            duration_days
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tokens:', error);
        return;
      }

      const formattedTokens = data?.map((voucher: any) => ({
        id: voucher.id,
        code: voucher.code,
        phone_number: voucher.profiles?.phone_number || 'N/A',
        first_name: voucher.profiles?.first_name || '',
        last_name: voucher.profiles?.last_name || '',
        plan_name: voucher.plans?.name || 'Unknown Plan',
        plan_price: voucher.plans?.price_ugx || 0,
        duration_days: voucher.plans?.duration_days || 0,
        created_at: voucher.created_at,
        activated_at: voucher.activated_at,
        expires_at: voucher.expires_at,
        is_active: voucher.is_active,
        is_used: voucher.is_used,
      })) || [];

      setTokens(formattedTokens);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTokenStatus = (token: TokenData) => {
    if (!token.is_used) return { label: "Unused", variant: "secondary" as const };
    if (!token.is_active) return { label: "Inactive", variant: "destructive" as const };
    if (token.expires_at && new Date(token.expires_at) < new Date()) {
      return { label: "Expired", variant: "destructive" as const };
    }
    return { label: "Active", variant: "default" as const };
  };

  const filteredTokens = tokens.filter(token =>
    token.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.phone_number.includes(searchTerm) ||
    `${token.first_name} ${token.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.plan_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTokens = tokens.length;
  const activeTokens = tokens.filter(t => t.is_active && t.is_used).length;
  const expiredTokens = tokens.filter(t => t.expires_at && new Date(t.expires_at) < new Date()).length;
  const unusedTokens = tokens.filter(t => !t.is_used).length;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading tokens...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tokens Issued</h1>
        <p className="text-xl text-muted-foreground">
          View all tokens issued to phone numbers with data plans and expiry information
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Ticket className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Tokens</p>
                <p className="text-2xl font-bold">{totalTokens}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Active Tokens</p>
                <p className="text-2xl font-bold">{activeTokens}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Expired Tokens</p>
                <p className="text-2xl font-bold">{expiredTokens}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Ticket className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Unused Tokens</p>
                <p className="text-2xl font-bold">{unusedTokens}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by token code, phone number, name, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tokens Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ticket className="w-5 h-5 mr-2" />
            Tokens Issued ({filteredTokens.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token Code</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Data Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Activated</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTokens.map((token) => {
                  const status = getTokenStatus(token);
                  return (
                    <TableRow key={token.id}>
                      <TableCell className="font-mono font-medium">
                        {token.code}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          {token.phone_number}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          {token.first_name || token.last_name 
                            ? `${token.first_name} ${token.last_name}`.trim()
                            : 'N/A'
                          }
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {token.plan_name}
                      </TableCell>
                      <TableCell>
                        UGX {token.plan_price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {token.duration_days} days
                      </TableCell>
                      <TableCell>
                        {format(new Date(token.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        {token.activated_at 
                          ? format(new Date(token.activated_at), 'MMM dd, yyyy HH:mm')
                          : 'Not activated'
                        }
                      </TableCell>
                      <TableCell>
                        {token.expires_at 
                          ? format(new Date(token.expires_at), 'MMM dd, yyyy HH:mm')
                          : 'No expiry'
                        }
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>
                          {status.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredTokens.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No tokens found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};