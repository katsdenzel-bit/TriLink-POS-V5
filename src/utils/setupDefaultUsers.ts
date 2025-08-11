import { supabase } from "@/integrations/supabase/client";

// Function to create default users (run this manually after deployment)
export const setupDefaultUsers = async () => {
  console.log("Setting up default users...");
  
  try {
    // Create admin user
    const { data: adminSignUp, error: adminError } = await supabase.auth.signUp({
      email: 'admin@trilinkwireless.com',
      password: 'admin123',
      options: {
        data: {
          first_name: 'System',
          last_name: 'Administrator',
          phone_number: '0771712356'
        }
      }
    });

    if (adminSignUp.user && !adminError) {
      // Set admin role
      await supabase
        .from('user_roles')
        .insert({ user_id: adminSignUp.user.id, role: 'admin' });
      console.log('Admin user created');
    }

    // Create staff user 1
    const { data: staff1SignUp, error: staff1Error } = await supabase.auth.signUp({
      email: 'staff1@trilinkwireless.com', 
      password: 'staff123',
      options: {
        data: {
          first_name: 'Staff',
          last_name: 'Member 1',
          phone_number: '0771712356'
        }
      }
    });

    if (staff1SignUp.user && !staff1Error) {
      await supabase
        .from('user_roles')
        .insert({ user_id: staff1SignUp.user.id, role: 'staff' });
      console.log('Staff user 1 created');
    }

    // Create staff user 2
    const { data: staff2SignUp, error: staff2Error } = await supabase.auth.signUp({
      email: 'staff2@trilinkwireless.com',
      password: 'staff123', 
      options: {
        data: {
          first_name: 'Staff',
          last_name: 'Member 2',
          phone_number: '0771712356'
        }
      }
    });

    if (staff2SignUp.user && !staff2Error) {
      await supabase
        .from('user_roles')
        .insert({ user_id: staff2SignUp.user.id, role: 'staff' });
      console.log('Staff user 2 created');
    }

    console.log('Default users setup complete!');
    return { success: true };
  } catch (error) {
    console.error('Error setting up default users:', error);
    return { success: false, error };
  }
};