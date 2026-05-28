'use client';

import { create } from 'zustand';
import { personas, type Persona } from './mock-data/tenant';

type PersonaKey = 'processOwner' | 'reviewer' | 'admin';

interface PersonaState {
  activeKey: PersonaKey;
  setActive: (key: PersonaKey) => void;
  active: () => Persona;
}

export const usePersona = create<PersonaState>((set, get) => ({
  activeKey: 'processOwner',
  setActive: (key) => set({ activeKey: key }),
  active: () => personas[get().activeKey],
}));

export function useActivePersona(): Persona {
  const key = usePersona((s) => s.activeKey);
  return personas[key];
}

export const personaKeys: PersonaKey[] = ['processOwner', 'reviewer', 'admin'];
