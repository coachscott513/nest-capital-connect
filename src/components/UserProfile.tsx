
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="text-sm">{user.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">User ID</label>
          <p className="text-xs text-muted-foreground font-mono">{user.id}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Last Sign In</label>
          <p className="text-sm">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}</p>
        </div>
        <Button onClick={signOut} variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
