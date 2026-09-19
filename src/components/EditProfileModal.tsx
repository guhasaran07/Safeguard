import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';

const avatarColors = [
  { label: 'Green', value: 'from-primary to-accent' },
  { label: 'Blue', value: 'from-blue-500 to-cyan-500' },
  { label: 'Orange', value: 'from-orange-500 to-amber-500' },
  { label: 'Rose', value: 'from-rose-500 to-pink-500' },
  { label: 'Violet', value: 'from-violet-500 to-purple-500' },
  { label: 'Teal', value: 'from-teal-500 to-emerald-500' },
];

export default function EditProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, setProfile, pushToast } = useApp();
  const [draft, setDraft] = useState(profile);

  const handleSave = () => {
    setProfile(draft);
    pushToast({ title: 'Profile updated', description: 'Your changes have been saved.', type: 'success' });
    onClose();
  };

  const initials = draft.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Profile"
      footer={
        <>
          <button onClick={onClose} className="btn-ghost px-5 py-2 text-sm">Cancel</button>
          <button onClick={handleSave} className="btn-primary px-5 py-2 text-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Avatar preview */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${draft.avatarColor} flex items-center justify-center text-white font-bold text-xl relative`}>
            {initials}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[rgb(var(--surface))] border flex items-center justify-center">
              <Camera className="w-3 h-3 text-muted" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">{draft.name}</p>
            <p className="text-xs text-muted">{draft.role} · {draft.university}</p>
          </div>
        </div>

        {/* Avatar color picker */}
        <div>
          <label className="text-sm text-muted font-medium">Avatar Color</label>
          <div className="flex gap-2 mt-2">
            {avatarColors.map((c) => (
              <button
                key={c.value}
                onClick={() => setDraft({ ...draft, avatarColor: c.value })}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${c.value} transition-all ${
                  draft.avatarColor === c.value ? 'ring-2 ring-offset-2 ring-primary ring-offset-[rgb(var(--surface))]' : ''
                }`}
                aria-label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm text-muted font-medium">Full Name</label>
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-muted font-medium">Email</label>
          <input
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm text-muted font-medium">Role</label>
          <select
            value={draft.role}
            onChange={(e) => setDraft({ ...draft, role: e.target.value })}
            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Student</option>
            <option>Exam Aspirant</option>
            <option>Professional</option>
            <option>Freelancer</option>
          </select>
        </div>

        {/* University */}
        <div>
          <label className="text-sm text-muted font-medium">University / Organization</label>
          <input
            value={draft.university}
            onChange={(e) => setDraft({ ...draft, university: e.target.value })}
            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm text-muted font-medium">Bio</label>
          <textarea
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
            rows={3}
            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}
