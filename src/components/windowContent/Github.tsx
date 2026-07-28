import { useState, useEffect } from 'react';

interface GithubProfile {
    name: string;
    login: string;
    location: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    html_url: string;
    message?: string;
}

export default function Github() {
    const [profile, setProfile] = useState<GithubProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/hkayrad`)
            .then((res) => res.json())
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!profile || profile.message) return <p>Profile not found</p>;

    return (
        <div className="github-card">
            <div className="flex gap-4 pb-4">
                <img src={profile.avatar_url} alt={profile.name} width="100" height="100" />
                <div>
                    <h2>{profile.name.replace(/ğ/g, 'g')}</h2>
                    <h4>@{profile.login}</h4>
                </div>
            </div>
            <a href={profile.bio} target="_blank" rel="noreferrer">
                {profile.bio}
            </a>
            <p>Location: {profile.location}</p>
            <p>Public Repos: {profile.public_repos}</p>
            <p>Followers: {profile.followers}</p>
            <a href={profile.html_url} target="_blank" rel="noreferrer">
                View Profile on GitHub
            </a>
        </div>
    );
}