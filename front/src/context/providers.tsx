'use client';
import { ReactNode } from 'react';
import { AuthProvider } from './session/sessionContext';
import { TradesProvider } from './trades/trades';
import { UserProvider } from './user/userContext';
import { NextUIProvider } from '@nextui-org/react';
import { ChatProvider } from './chat/ChatContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ChatProvider>
          <UserProvider>
            <TradesProvider>{children}</TradesProvider>
          </UserProvider>
        </ChatProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}
