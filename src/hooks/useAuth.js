import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useAuthProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      // 🔹 Ensure profile exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
      const { data: newProfile } = await supabase
  .from("profiles")
  .upsert({
    id: user.id,
    full_name: user.user_metadata?.full_name || null,
    business_name: user.user_metadata?.business_name || null,
  })
  .select()
  .single();


        setProfile(newProfile);
      } else {
        setProfile(existingProfile);
      }

      setLoading(false);
    };

    init();
  }, []);

  return { user, profile, loading };
}
