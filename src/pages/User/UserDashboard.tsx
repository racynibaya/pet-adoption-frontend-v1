import { Link } from 'react-router-dom';
import { useAdopter } from '@/context/useUser';
import { useFavorites } from '@/context/useFavorites';
import { useStaff } from '@/context/useStaff';
import { ageLabel, type PetCard } from '@/data/pets';

export default function UserDashboard() {
  const { adopter } = useAdopter();
  const { saved } = useFavorites();
  const { pets } = useStaff();

  if (!adopter) return null;

  const savedIds = new Set(saved);
  const savedPets = pets.filter((p) => savedIds.has(String(p.id)));
  const suggestions = pets
    .filter((p) => p.status === 'AVAILABLE' && !savedIds.has(String(p.id)))
    .slice(0, 4);

  const greeting = greetingFor(new Date().getHours());
  const journeyStep = savedPets.length === 0 ? 'Discovering' : 'Shortlisting';
  const journeyPct =
    savedPets.length === 0 ? 12 : Math.min(70, 25 + savedPets.length * 8);
  const joinedLabel = formatJoined(adopter.joinedAt);

  return (
    <div className='user-shell'>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className='u-section user-hero' style={{ ['--i' as string]: 0 }}>
        <div>
          <div className='user-hero-eyebrow'>{greeting}, friend</div>
          <h1 className='user-hero-title'>
            Welcome back, <em>{adopter.firstName || 'there'}</em>.
          </h1>
          <p className='user-hero-lede'>
            Your adoption journey is a story still being written. Below is where
            you left off — the pets you’ve saved, the steps you’ve taken, and a
            few new faces we think you should meet.
          </p>
          <div className='user-hero-meta'>
            <span>Member since {joinedLabel}</span>
            <span className='dot' aria-hidden />
            <span>
              {savedPets.length} saved {savedPets.length === 1 ? 'pet' : 'pets'}
            </span>
            <span className='dot' aria-hidden />
            <span>{adopter.email}</span>
          </div>
        </div>

        <div className='user-hero-side'>
          <div className='user-avatar-tile'>
            <div className='user-avatar-orb' aria-hidden>
              <div className='user-avatar-orb-inner'>
                {adopter.initials || 'KN'}
              </div>
            </div>
            <div className='user-avatar-meta'>
              <div className='user-avatar-name'>
                {adopter.name || adopter.email}
              </div>
              <div className='user-avatar-email'>{adopter.email}</div>
            </div>
            <span
              className={
                adopter.isVerified ? 'user-verified' : 'user-verified pending'
              }
            >
              {adopter.isVerified ? 'Verified' : 'Verify'}
            </span>
          </div>

          <div className='user-journey'>
            <div className='user-journey-label'>Adoption journey</div>
            <div className='user-journey-step'>{journeyStep}</div>
            <div className='user-journey-bar' aria-hidden>
              <div
                className='user-journey-bar-fill'
                style={{ width: `${journeyPct}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section
        className='u-section user-stats'
        style={{ ['--i' as string]: 1 }}
      >
        <article
          className='user-stat'
          style={{ ['--accent' as string]: 'var(--u-amber)' }}
        >
          <div className='user-stat-label'>Saved</div>
          <div className='user-stat-value'>{savedPets.length}</div>
          <div className='user-stat-note'>Pets you’d love to meet</div>
        </article>
        <article
          className='user-stat'
          style={{ ['--accent' as string]: 'var(--u-teal)' }}
        >
          <div className='user-stat-label'>Applications</div>
          <div className='user-stat-value'>0</div>
          <div className='user-stat-note'>None submitted yet</div>
        </article>
        <article
          className='user-stat'
          style={{ ['--accent' as string]: 'var(--u-rose)' }}
        >
          <div className='user-stat-label'>Matches nearby</div>
          <div className='user-stat-value'>{suggestions.length}</div>
          <div className='user-stat-note'>Available in shelters near you</div>
        </article>
      </section>

      {/* ── Saved pets ───────────────────────────────────────────────────── */}
      <section
        className='u-section'
        style={{ ['--i' as string]: 2, marginTop: 48 }}
      >
        <header className='u-section-head'>
          <div>
            <div className='u-section-num'>01 — Saved</div>
            <h2 className='u-section-title'>The ones who caught your eye</h2>
          </div>
          <div className='u-section-aside'>
            <Link to='/pets'>Browse all pets →</Link>
          </div>
        </header>

        {savedPets.length === 0 ? (
          <div className='user-empty'>
            <div className='user-empty-title'>No saved pets yet</div>
            <p style={{ margin: 0 }}>
              Tap the heart on any pet to keep them here for later.
            </p>
            <Link to='/pets' className='user-empty-cta'>
              Start browsing
            </Link>
          </div>
        ) : (
          <div className='user-pet-grid'>
            {savedPets.map((p) => (
              <PetMiniCard key={p.id} pet={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Application timeline ─────────────────────────────────────────── */}
      <section
        className='u-section'
        style={{ ['--i' as string]: 3, marginTop: 48 }}
      >
        <header className='u-section-head'>
          <div>
            <div className='u-section-num'>02 — Journey</div>
            <h2 className='u-section-title'>Where you are right now</h2>
          </div>
          <div className='u-section-aside'>
            A guided path from first click to first meet.
          </div>
        </header>

        <div className='user-timeline'>
          <div>
            <h3 className='user-timeline-head'>
              {savedPets.length === 0
                ? 'Start by saving a few favorites.'
                : 'You’re ready to take the next step.'}
            </h3>
            <p className='user-timeline-body'>
              Most adoptions begin with a short conversation. When you’re ready,
              open a pet’s page and submit an application — the shelter will
              reach out within a few days.
            </p>
          </div>

          <ol className='user-steps' aria-label='Adoption steps'>
            <li
              className={`user-step ${savedPets.length > 0 ? 'is-done' : 'is-active'}`}
            >
              <span className='user-step-dot'>
                {savedPets.length > 0 ? '✓' : '1'}
              </span>
              <div>
                <div className='user-step-title'>Save pets you love</div>
                <div className='user-step-meta'>
                  {savedPets.length} saved so far
                </div>
              </div>
            </li>
            <li
              className={`user-step ${savedPets.length > 0 ? 'is-active' : ''}`}
            >
              <span className='user-step-dot'>2</span>
              <div>
                <div className='user-step-title'>Submit an application</div>
                <div className='user-step-meta'>Takes about 5 minutes</div>
              </div>
            </li>
            <li className='user-step'>
              <span className='user-step-dot'>3</span>
              <div>
                <div className='user-step-title'>Meet & welcome home</div>
                <div className='user-step-meta'>
                  Coordinated with the shelter
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Suggested matches ────────────────────────────────────────────── */}
      <section
        className='u-section'
        style={{ ['--i' as string]: 4, marginTop: 48 }}
      >
        <header className='u-section-head'>
          <div>
            <div className='u-section-num'>03 — For you</div>
            <h2 className='u-section-title'>A few you might love</h2>
          </div>
          <div className='u-section-aside'>
            <Link to='/pets'>See more →</Link>
          </div>
        </header>

        {suggestions.length === 0 ? (
          <div className='user-empty'>
            <div className='user-empty-title'>Nothing new just yet</div>
            <p style={{ margin: 0 }}>
              Check back soon — new pets arrive at shelters every week.
            </p>
          </div>
        ) : (
          <div className='user-pet-grid'>
            {suggestions.map((p) => (
              <PetMiniCard key={p.id} pet={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Profile snippet ──────────────────────────────────────────────── */}
      <section
        className='u-section'
        style={{ ['--i' as string]: 5, marginTop: 48 }}
      >
        <header className='u-section-head'>
          <div>
            <div className='u-section-num'>04 — Account</div>
            <h2 className='u-section-title'>Your details</h2>
          </div>
        </header>

        <div className='user-profile'>
          <div className='user-profile-block'>
            <span className='user-profile-label'>Full name</span>
            <span className='user-profile-value'>{adopter.name || '—'}</span>
          </div>
          <div className='user-profile-block'>
            <span className='user-profile-label'>Email</span>
            <span className='user-profile-value'>{adopter.email}</span>
          </div>
          <div className='user-profile-block'>
            <span className='user-profile-label'>Phone</span>
            <span
              className={`user-profile-value ${adopter.phoneNumber ? '' : 'empty'}`}
            >
              {adopter.phoneNumber || 'Add a number so shelters can reach you'}
            </span>
          </div>
          <div className='user-profile-block'>
            <span className='user-profile-label'>Address</span>
            <span
              className={`user-profile-value ${adopter.address ? '' : 'empty'}`}
            >
              {adopter.address || 'Not set yet'}
            </span>
          </div>

          <div className='user-profile-cta'>
            <p className='user-profile-cta-note'>
              A complete profile speeds up shelter approvals. You can add the
              missing details when you submit your first application.
            </p>
            <Link to='/pets' className='user-btn user-btn-primary'>
              Find your match →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Pet mini card ──────────────────────────────────────────────────────────
function PetMiniCard({ pet }: { pet: PetCard }) {
  return (
    <Link to={`/pets/${pet.id}`} className='user-pet-card'>
      <div className='user-pet-thumb' style={{ background: pet.bg }}>
        <img src={pet.imageUrl} />
      </div>
      <div className='user-pet-body'>
        <h3 className='user-pet-name'>{pet.name}</h3>
        <div className='user-pet-meta'>
          <span>{pet.breed}</span>
          <span>·</span>
          <span>{ageLabel(pet.ageMonths)}</span>
        </div>
        {pet.shelterName && (
          <div className='user-pet-shelter'>{pet.shelterName}</div>
        )}
      </div>
    </Link>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function greetingFor(hour: number): string {
  if (hour < 5) return 'Late evening';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Late evening';
}

function formatJoined(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  } catch {
    return 'recently';
  }
}
