import { NextResponse } from 'next/server';
import { globalPurchases } from '../purchase/route';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
  }

  const order = globalPurchases.find((p) => p.id === orderId);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return new NextResponse(order.codeSnippet, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${order.customConfig.brandName.toLowerCase().replace(/\s+/g, '-')}-source-code.tsx"`,
    },
  });
}
