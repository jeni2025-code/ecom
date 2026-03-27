import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  MapPin,
  ArrowRight,
  Filter,
  X,
  Package,
  Sparkles,
  ShoppingBag,
  Loader2,
  Eye
} from 'lucide-react'
import './HomePage.css'

import { API_URL } from '../config'}`}
                          onClick={(e) => handleWishlistToggle(e, item.id)}
                        >
                          <Heart size={20} fill={wishlistIds.has(item.id) ? "currentColor" : "none"} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="card-content-elite">
                    <div className="card-meta-elite">
                      <MapPin size={12} />
                      <span>{item.city || 'Global'}</span>
                      <span className="dot">·</span>
                      <span>{item.category?.split(' ')[0] || 'Curated'}</span>
                      <span className="dot">·</span>
                      <div className="card-views-elite" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)' }}>
                        <Eye size={12} />
                        <span>{item.views_count || 0}</span>
                      </div>
                    </div>

                    <h3 className="card-title-elite">{item.title}</h3>
                    <p className="card-desc-elite">{item.description}</p>

                    <div className="card-footer-elite">
                      <div className="price-wrap-elite">
                        <span className="price-elite">₹{item.price.toLocaleString()}</span>
                      </div>
                      <div className="btn-view-elite">
                        <span>View</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      )}
    </div>
  )
}

