'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/store/store';

export default function ProfileGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { profile } = useProfileStore()

  useEffect(() => {
    // const stored = localStorage.getItem('profile');
    if (!profile) {
      router.push('/app/select-profile'); // or show a profile picker modal
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>; // or a loading spinner
  return profile ? <>{children}</> : null;
}