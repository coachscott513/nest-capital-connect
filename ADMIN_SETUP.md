# Admin User Setup Guide

## Creating the First Admin User

This application uses role-based access control (RBAC) to protect sensitive features like viewing leads and managing user roles. To access admin features, you need to create the first admin user.

### Prerequisites
1. At least one user must be registered in the application
2. Access to the Supabase SQL Editor for your project

### Step-by-Step Instructions

1. **Register the first user** through the application's signup process
2. **Open Supabase SQL Editor** at: https://supabase.com/dashboard/project/akonlzlpbdoqmczidfwm/sql/new
3. **Execute the following SQL** (replace the email with your admin user's email):

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'your-admin@email.com'),
  'admin'::app_role
);
```

4. **Verify the admin role** was created:
```sql
SELECT u.email, ur.role 
FROM auth.users u 
JOIN public.user_roles ur ON u.id = ur.user_id 
WHERE ur.role = 'admin';
```

### Alternative: Automated Bootstrap Function

If you prefer an automated approach, you can create a bootstrap function that makes the first registered user an admin:

```sql
CREATE OR REPLACE FUNCTION bootstrap_first_admin()
RETURNS void
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow if no admins exist
  IF NOT EXISTS (SELECT 1 FROM user_roles WHERE role = 'admin') THEN
    -- Make first user an admin
    INSERT INTO user_roles (user_id, role)
    SELECT id, 'admin'::app_role
    FROM auth.users
    ORDER BY created_at
    LIMIT 1;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Call the function
SELECT bootstrap_first_admin();
```

### What Admin Users Can Do
- View all submitted leads
- Manage user roles
- Access admin-protected features
- Update and delete leads

### Security Notes
- Only create admin users for trusted individuals
- Admin roles cannot be self-assigned due to RLS policies
- The initial admin creation requires database-level access for security