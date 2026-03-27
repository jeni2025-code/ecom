import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Package, ArrowRight, ShieldCheck, Settings, TrendingUp, Handshake, ThumbsUp, AlertCircle } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import './HomePage.css'

import { API_URL } from '../config',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Ecosystem Proof ({profile.received_reviews?.length || 0})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'inventory' ? (
          <motion.section
            key="inventory"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="profile-assets"
          >
            {(!profile.listings || profile.listings.length === 0) ? (
              <div className="empty-state-elite">
                <Package size={48} />
                <p>No active catalog assets found.</p>
              </div>
            ) : (
              <div className="listing-grid-elite">
                {profile.listings.map((item: any) => (
                  <motion.div key={item.id} className="elite-card-wrap">
                    <article className="elite-card">
                      <div className="card-image-wrap">
                        <img src={item.images?.[0]?.url || 'https://placehold.co/400x400/1e293b/10b981?text=Listing'} alt="" className="elite-card-image" />
                      </div>
                      <div className="card-content-elite">
                        <h3 className="card-title-elite">{item.title}</h3>
                        <div className="card-footer-elite">
                          <span className="price-elite">₹{item.price.toLocaleString()}</span>
                          <Link to={`/listings/${item.id}`} className="btn-view-elite">
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        ) : activeTab === 'buying' ? (
          <motion.section
            key="buying"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="profile-assets"
          >
            {buyingHistory.length === 0 ? (
              <div className="empty-state-elite">
                <Package size={48} />
                <p>No orders found.</p>
              </div>
            ) : (
              <div className="listing-grid-elite">
                {buyingHistory.map((order: any) => (
                  order.items?.map((item: any) => (
                    <motion.div key={item.id} className="elite-card-wrap">
                      <article className="elite-card">
                        <div className="card-image-wrap">
                          <img src={item.listing?.images?.[0]?.url || 'https://placehold.co/400x400/1e293b/10b981?text=Order'} alt="" className="elite-card-image" />
                        </div>
                        <div className="card-content-elite">
                          <h3 className="card-title-elite">{item.listing?.title}</h3>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            Order #{order.id} • {order.status}
                          </div>
                          <div className="card-footer-elite">
                            <span className="price-elite">₹{item.price_at_order?.toLocaleString()}</span>
                            <Link to={`/listings/${item.listing?.id}`} className="btn-view-elite">
                              <ArrowRight size={18} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  ))
                ))}
              </div>
            )}
          </motion.section>
        ) : activeTab === 'selling' ? (
          <motion.section
            key="selling"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="profile-assets"
          >
            {sellingHistory.length === 0 ? (
              <div className="empty-state-elite">
                <Package size={48} />
                <p>No sales found.</p>
              </div>
            ) : (
              <div className="listing-grid-elite">
                {sellingHistory.map((order: any) => (
                  order.items?.map((item: any) => (
                    <motion.div key={item.id} className="elite-card-wrap">
                      <article className="elite-card">
                        <div className="card-image-wrap">
                          <img src={item.listing?.images?.[0]?.url || 'https://placehold.co/400x400/1e293b/10b981?text=Sale'} alt="" className="elite-card-image" />
                        </div>
                        <div className="card-content-elite">
                          <h3 className="card-title-elite">{item.listing?.title}</h3>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            {order.status === 'ongoing' ? 'New Buy Request' : `Status: ${order.status}`}
                          </div>
                          <div className="card-footer-elite" style={{ flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                            <span className="price-elite">₹{item.price_at_order?.toLocaleString()}</span>
                            
                            {order.status === 'ongoing' && (
                              <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
                                <button 
                                  onClick={() => handleAcceptOrder(order.id)}
                                  className="btn-chat-premium"
                                  style={{ flex: 1, background: 'var(--accent-emerald)', border: 'none', color: '#fff', padding: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                  Accept
                                </button>
                                <button 
                                  onClick={() => handleRejectOrder(order.id)}
                                  className="btn-chat-premium"
                                  style={{ flex: 1, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                  Reject
                                </button>
                              </div>
                            )}

                            {order.status === 'pending' && (
                              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.9rem', fontWeight: 700, marginTop: '8px' }}>Accepted (Pending Trade)</span>
                            )}

                            <Link to={`/listings/${item.listing?.id}`} className="btn-view-elite" style={{ position: 'absolute', right: '12px', top: '12px' }}>
                              <ArrowRight size={18} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  ))
                ))}
              </div>
            )}
          </motion.section>
        ) : (
          <motion.section
            key="reviews"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="profile-reviews"
          >
            {(!profile.received_reviews || profile.received_reviews.length === 0) ? (
              <div className="empty-state-elite">
                <ShieldCheck size={48} />
                <p>You have yet to anchor your legacy with verified trades.</p>
              </div>
            ) : (
              <div className="reviews-list-elite" style={{ display: 'grid', gap: '24px' }}>
                {profile.received_reviews.map((rev: any) => (
                  <div key={rev.id} className="review-card-elite glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="stars-elite" style={{ color: 'var(--accent-gold)', display: 'flex', gap: '2px' }}>
                          {[...Array(10)].map((_, i) => (
                            <span key={i} style={{ opacity: i < rev.rating ? 1 : 0.2 }}>★</span>
                          ))}
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{rev.rating}/10</span>
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Verified Trade Record</span>
                    </div>

                    <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: 'var(--text-primary)' }}>"{rev.comment}"</p>

                    {rev.order?.items?.[0] && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <img
                          src={rev.order.items[0].listing?.images?.[0]?.url || 'https://placehold.co/50x50'}
                          alt=""
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Verified Asset Recieved</span>
                          <span style={{ fontWeight: 600 }}>{rev.order.items[0].listing?.title}</span>
                        </div>
                      </div>
                    )}

                    {rev.media_url && (
                      <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                        <img src={rev.media_url} alt="Review verification" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                        <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '8px', fontSize: '0.7rem', textAlign: 'center', fontWeight: 700 }}>
                          <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          MEDIA VERIFIED: TIMESTAMP & SIGNATURE CHECK COMPLETED
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

