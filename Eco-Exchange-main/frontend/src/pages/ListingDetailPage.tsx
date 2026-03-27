import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    MessageSquare,
    Heart,
    Share2,
    Shield,
    TreePine,
    Zap,
    ArrowLeft,
    Calendar,
    MapPin,
    Edit3,
    Trash2,
    Sparkles,
    Loader2,
    Package,
    Eye
} from 'lucide-react'
import './ListingDetailPage.css'

import { API_URL } from '../config'}`} onClick={handleWishlist}>
                                            <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
                                        </button>
                                        <button className="action-circle"><Share2 size={20} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                        <h1 className="text-gradient">{listing.title}</h1>
                        <div className="detail-price-elite">₹{listing.price.toLocaleString()}</div>
                    </div>

                    <div className="detail-specs glass">
                        <div className="spec-item">
                            <MapPin size={18} />
                            <span>{listing.city || 'Global'}</span>
                        </div>
                        <div className="spec-item">
                            <Calendar size={18} />
                            <span>Listed {new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="spec-item">
                            <Shield size={18} />
                            <span>Verified Exchange</span>
                        </div>
                        <div className="spec-item" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                            <Eye size={18} />
                            <span>{listing.views_count?.toLocaleString() || 0} People viewed this</span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h3>The Narrative</h3>
                        <p className="description-elite">{listing.description}</p>
                    </div>

                    {listing.accept_exchange && (
                        <div className="exchange-section glass" style={{ marginTop: '32px', padding: '24px', borderRadius: '16px', border: '1px solid var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.03)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <Package size={24} className="emerald-glow" />
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Ecosystem Exchange</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                The owner is open to exchanging this item for something of equal value or interest.
                            </p>
                            {listing.exchange_preferences && (
                                <div className="preference-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--accent-emerald)' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Seeking in returns:</span>
                                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-primary)' }}>"{listing.exchange_preferences}"</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="owner-section">
                        <h3>Guardian of this Item</h3>
                        <div className="owner-card-elite">
                            <div className="owner-avatar">
                                {listing.owner?.profile_image_url ? (
                                    <img src={listing.owner.profile_image_url} alt={listing.owner.name} />
                                ) : (
                                    <span>{listing.owner?.name?.[0] || 'U'}</span>
                                )}
                            </div>
                            <div className="owner-meta">
                                <span className="owner-name">{listing.owner?.name || 'Ecosystem Member'}</span>
                                <span className="owner-rating">★★★★★ · 4.9 Trust Score</span>
                            </div>
                            <Link to={`/users/${listing.owner_id}`} className="btn-link-elite">View Profile</Link>
                        </div>
                    </div>

                    {!isOwner && (
                        <div className="purchase-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <button
                                onClick={async () => {
                                    if (!token) return navigate('/login');
                                    try {
                                        const res = await fetch(`${API_URL}/messages/conversations`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`
                                            },
                                            body: JSON.stringify({ listing_id: Number(id) })
                                        });
                                        if (res.ok) {
                                            const data = await res.json();
                                            console.log(`[ListingDetail] Requested Listing ID: ${Number(id)}, Returned Conversation ID: ${data.id}`);
                                            navigate(`/chat/${data.id}`);
                                        } else {
                                            const err = await res.json();
                                            console.error("[ListingDetail] Signaling Fault:", err);
                                            alert(err.detail || "Unable to start conversation");
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        alert("Connection fault in signaling thread");
                                    }
                                }}
                                className="btn-chat-premium"
                                style={{ flex: 1, minWidth: '200px', border: 'none', cursor: 'pointer' }}
                            >
                                <MessageSquare size={20} />
                                <span>Secure Negotiation</span>
                            </button>
                            
                            <button
                                onClick={handleBuy}
                                className="btn-chat-premium"
                                style={{ 
                                    flex: 1, 
                                    minWidth: '200px', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    background: 'var(--accent-emerald)',
                                    color: '#fff'
                                }}
                            >
                                <Zap size={20} />
                                <span>Buy Now</span>
                            </button>

                            <p className="trust-footer" style={{ width: '100%' }}>
                                <Shield size={12} />
                                Your payment is protected by Eco-Exchange Vault.
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* RECOMMENDATIONS SECTION */}
            <div className="recommendations-container-elite">
                {recs?.frequently_bought_together && recs.frequently_bought_together.length > 0 && (
                    <section className="recommendation-section">
                        <div className="section-header-recs">
                            <Package size={20} className="emerald-glow" />
                            <h2>Frequently Brought Together</h2>
                        </div>
                        <div className="recs-scroll-list">
                            {recs.frequently_bought_together.map(item => (
                                <Link to={`/listings/${item.id}`} key={item.id} className="rec-card-mini glass">
                                    <div className="rec-image">
                                        <img src={item.images[0]?.url} alt={item.title} />
                                    </div>
                                    <div className="rec-details">
                                        <span className="rec-title">{item.title}</span>
                                        <span className="rec-price">₹{item.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {recs?.visually_similar && recs.visually_similar.length > 0 && (
                    <section className="recommendation-section">
                        <div className="section-header-recs">
                            <Sparkles size={20} style={{ color: '#3b82f6' }} />
                            <h2>Visually Similar Products</h2>
                        </div>
                        <div className="recs-scroll-list">
                            {recs.visually_similar.map(item => (
                                <Link to={`/listings/${item.id}`} key={item.id} className="rec-card-mini glass">
                                    <div className="rec-image">
                                        <img src={item.images[0]?.url} alt={item.title} />
                                    </div>
                                    <div className="rec-details">
                                        <span className="rec-title">{item.title}</span>
                                        <span className="rec-price">₹{item.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {recs?.user_recommendations && recs.user_recommendations.length > 0 && (
                    <section className="recommendation-section personalized">
                        <div className="section-header-recs">
                            <Zap size={20} style={{ color: '#f59e0b' }} />
                            <h2>Suggested Just For You</h2>
                        </div>
                        <div className="recs-scroll-list">
                            {recs.user_recommendations.map(item => (
                                <Link to={`/listings/${item.id}`} key={item.id} className="rec-card-mini glass">
                                    <div className="rec-image">
                                        <img src={item.images[0]?.url} alt={item.title} />
                                    </div>
                                    <div className="rec-details">
                                        <span className="rec-title">{item.title}</span>
                                        <span className="rec-price">₹{item.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

