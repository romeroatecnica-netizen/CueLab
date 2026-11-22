import React from 'react';
import type {UiStrings} from '../i18n/uiTranslations';

interface AdSlotProps {
  slotId: 'mid-leaderboard' | 'bottom-leaderboard';
  ui: UiStrings;
}

/**
 * Media.net Preconfigured Ad Container (CLS-Safe & Print-Hidden)
 *
 * Production Integration Steps:
 * 1. Load your Media.net head script in index.html using your publisher `cid`:
 *    <script type="text/javascript">window._mNHandle = window._mNHandle || {}; window._mNHandle.queue = window._mNHandle.queue || []; medianet_versionId = "3121199";</script>
 *    <script src="https://contextual.media.net/dmedianet.js?cid=YOUR_MEDIA_NET_CID" async="async"></script>
 * 2. Replace `YOUR_CRID_MID` / `YOUR_CRID_BOTTOM` with your Media.net ad unit IDs and invoke:
 *    window._mNHandle.queue.push(function () { window._mNDetails.loadTag(containerId, "728x90", crid); });
 * 3. Reserved `min-height` prevents Cumulative Layout Shift (CLS = 0).
 */
export const AdSlot: React.FC<AdSlotProps> = ({slotId, ui}) => {
  const label = slotId === 'mid-leaderboard' ? ui.ads.slotMidLabel : ui.ads.slotBottomLabel;

  return (
    <aside
      aria-label={ui.ads.disclosure}
      data-ad-provider="media-net"
      data-ad-slot={slotId}
      className="no-print my-4"
    >
      <div className="mx-auto flex min-h-[100px] sm:min-h-[108px] w-full max-w-4xl flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100/70 px-4 py-3 text-center">
        <span className="text-[11px] font-medium text-slate-500">{ui.ads.disclosure}</span>
        {/* Replace inner placeholder node with live Media.net tag target <div id={slotId} /> */}
        <div id={`medianet-${slotId}`} className="mt-1 text-xs font-medium text-slate-400">
          {label} · 728×90 / 320×100
        </div>
      </div>
    </aside>
  );
};
