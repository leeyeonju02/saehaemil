import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageSection } from "@/components/ui";
import Hero from "@/components/homepage/Hero";
import DonationDetailView from "@/components/sections/donation/DonationDetailView";
import {
  fetchDonationByIdFromSupabase,
  fetchDonationNeighbors,
} from "@/lib/donations";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const donation = await fetchDonationByIdFromSupabase(id);
  if (!donation) {
    return { title: "후원 내역 | 새해밀", description: "후원 내역 상세" };
  }

  return {
    title: `후원 내역: ${donation.donation_title} | 새해밀`,
    description: donation.donation_title,
  };
}

export default async function DonationRecordDetailPage({ params }: Props) {
  const { id } = await params;
  const donation = await fetchDonationByIdFromSupabase(id);
  if (!donation) notFound();

  const neighbors = await fetchDonationNeighbors(donation.id);

  return (
    <>
      <Hero />
      <PageSection>
        <DonationDetailView
          donation={donation}
          prev={neighbors.prev}
          next={neighbors.next}
        />
      </PageSection>
    </>
  );
}
